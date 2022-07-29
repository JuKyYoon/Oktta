import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from '../components/UserVideoComponent'
import { changeState } from '../modules/sessionState';
import { axiosAuth } from '../services/axios';
import Button from '@mui/material/Button';


const ScreenShare = () => {
  const dispatch = useDispatch();
  const onChangeState = (data) => dispatch(changeState(data));
  const params = useParams();
  const currentState = useSelector(state => state.sessionState);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([{ from: 'system', data: '환영합니다!' }]);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [OV, setOV] = useState();

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

  const joinSession = (role) => {
    // --- 1) Get an OpenVidu object ---

    const OV = new OpenVidu();
    setOV(OV)

    // --- 2) Init a session ---
    var mySession = OV.initSession();
    onChangeState({ session: mySession });

    // --- 3) Specify the actions when events take place in the session ---
    mySession.on('streamCreated', (event) => {
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
    axiosAuth.post(`/api/v1/session/${params.id}`)
      .then((res) => res.data.result)
      .catch((err) => console.log(err))
      .then((token) => {
        mySession
          .connect(
            token,
            { clientData: currentState.myUserName },
          )
          .then(async () => {
            // --- 5) Get your own camera stream ---
            let publisher = OV.initPublisher('video-container', {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: role === 'publisher' ? 'screen' : false, // The source of video. If undefined default webcam: screen으로 설정하면 화면공유
              publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
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
      })
  }

  const audioToggle = () => {
    setAudioEnabled(!audioEnabled);
    currentState.publisher.properties.publishAudio(!audioEnabled);
  }

  const leaveSession = () => {

    const mySession = currentState.session;

    if (mySession) {
      mySession.disconnect();
    }

    // delete 요청 날리기

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

  useEffect(() => {
    joinSession('publisher');
  }, []);

  return (
    <div>
      <div id="session">
        <div id="session-header">
          <h1 id="session-title">{currentState.mySessionId}</h1>
        </div>
        <Button
          variant="contained"
          onClick={leaveSession}
        >
          LeaveSession
        </Button>
        <Button
          variant="contained"
          onClick={audioToggle}
        >
          {audioEnabled ? '마이크 끄기' : '마이크 켜기'}
        </Button>
        <div id="video-container" className="col-md-6"></div>
      </div>
      <div className='chat'>
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
  )
};

export default ScreenShare;
