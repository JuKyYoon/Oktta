import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from '../components/UserVideoComponent'
import { changeState } from '../modules/sessionState';
// import { request } from '../services/axios';
import axios from 'axios';


const ScreenShare = () => {
  const dispatch = useDispatch();
  const onChangeState = (data) => dispatch(changeState(data));
  const currentState = useSelector(state => state.sessionState);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([{ from: 'system', data: '환영합니다!' }]);
  const [OV, setOV] = useState();

  const handleChangeSessionId = (event) => {
    onChangeState({ mySessionId: event.target.value });
  }

  const handleChangeUserName = (event) => {
    onChangeState({ myUserName: event.target.value });
  }

  const handleMainVideoStream = (stream) => {
    if (currentState.mainStreamManager !== stream) {
      onChangeState({ mainStreamManager: stream });
    }
  }

  const changeMessage = (event) => {
    setInputMessage(event.target.value)
  }

  const sendMessage = (event) => {
    event.preventDefault()
    currentState.session.signal({
      data: inputMessage,
    })
      .then(() => {
        console.log('Message successfully sent');
        setInputMessage('')
      })
      .catch(error => {
        console.error(error);
      });
  }

  const deleteSubscriber = (streamManager) => {
    let subscribers = currentState.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      onChangeState({
        subscribers: subscribers,
      });
    }
  }

  // ------------백엔드 연결해서 바꾸기------------
  const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
  const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

  const createSession = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post('https://' + window.location.hostname + ':4443' + '/openvidu/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' + OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                OPENVIDU_SERVER_URL +
                '"\n\nClick OK to navigate and accept it. ' +
                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                OPENVIDU_SERVER_URL +
                '"',
              )
            ) {
              window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  }

  const createToken = (sessionId) => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  const getToken = () => {
    // const token = request('post', '/api-sessions/get-token/')
    const token = createSession(currentState.mySessionId)
      .then((sessionId) => createToken(sessionId))
      .catch((Err) => console.error(Err));
    return token
  }

  // ------------백엔드 연결해서 바꾸기------------

  const joinSession = (event) => {
    event.preventDefault()
    // --- 1) Get an OpenVidu object ---

    const OV = new OpenVidu();
    setOV(OV)

    // --- 2) Init a session ---
    var mySession = OV.initSession();
    onChangeState({ session: mySession });

    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      var subscriber = mySession.subscribe(event.stream, undefined);
      var subscribers = currentState.subscribers;
      subscribers.push(subscriber);

      // Update the state with the new subscribers
      onChangeState({ subscribers: subscribers });
    });

    // On every Stream destroyed...
    mySession.on('streamDestroyed', (event) => {

      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on('exception', (exception) => {
      console.warn(exception);
    });
    // 메세지 받기
    mySession.on('signal', (event) => {
      const data = event.data;
      const from = JSON.parse(event.from.data).clientData;
      setMessages(messages => [...messages, { from, data }])
    });

    // --- 4) Connect to the session with a valid user token ---

    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    getToken().then((token) => {
      // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
      // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
      mySession
        .connect(
          token,
          { clientData: currentState.myUserName },
        )
        .then(async () => {
          // 비디오 입력 사용하지 않음
          // var devices = await OV.getDevices();
          // var videoDevices = devices.filter(device => device.kind === 'videoinput');

          // --- 5) Get your own camera stream ---

          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired properties
          let publisher = OV.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: 'screen', // The source of video. If undefined default webcam: screen으로 설정하면 화면공유
            // videoSource: false,
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6) Publish your stream ---

          mySession.publish(publisher);

          // Set the main video in the page to display our webcam and store our Publisher
          onChangeState({
            // currentVideoDevice: videoDevices[0],
            mainStreamManager: publisher,
            publisher: publisher,
          });
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    },
    );
  }

  const leaveSession = () => {

    const mySession = currentState.session;

    if (mySession) {
      mySession.disconnect();
    }

    onChangeState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined
    });
    setOV(null);
  }

  return (
    <div>
      <h1>화면공유</h1>

      {currentState.session === undefined ? (
        <div id="join">
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={currentState.myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={currentState.mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ width: '60%' }}>
          <div id="session">
            <div id="session-header">
              <h1 id="session-title">{currentState.mySessionId}</h1>
              <input
                type="button"
                id="buttonLeaveSession"
                onClick={leaveSession}
                value="Leave session"
              />
            </div>
            <div id="video-container" className="col-md-6">
              {currentState.publisher !== undefined ? (
                <div onClick={() => handleMainVideoStream(currentState.publisher)}>
                  <UserVideoComponent
                    streamManager={currentState.publisher} />
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ border: 'solid 2px', width: '30%', right: '5%', position: 'absolute' }}>
            <h2>채팅</h2>
            <ul>
              {messages.map((message, idx) => {
                return <li key={idx}>{message.from} : {message.data}</li>
              })}
            </ul>
            <form onSubmit={sendMessage}>
              <input type="text" onChange={changeMessage} value={inputMessage} />
              <button type='submit'>전송</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
};

export default ScreenShare;
