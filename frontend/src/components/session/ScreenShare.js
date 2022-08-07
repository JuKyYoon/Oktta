/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import Button from '@mui/material/Button';
import MessageItem from './MessageItem';
import { createSessionRequest, deleteSessionRequest } from '../../services/sessionService';


const ScreenShare = () => {
  const params = useParams();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { from: 'system', data: '환영합니다!' },
  ]);
  const [session, setSession] = useState(null);
  const sessionRef = useRef();

  const [role, setRole] = useState('publisher');
  const [publisher, setPublisher] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [openVidu, setOpenVidu] = useState();

  let token = "";

  const changeMessage = (event) => {
    setInputMessage(event.target.value);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (inputMessage) {
      session
        .signal({
          data: inputMessage,
        })
        .then(() => {
          setInputMessage('');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const deleteSubscriber = (streamManager) => {
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
    }
  };

  const joinSession = (role) => {
    console.log(token)
    // OpenVidu 객체 생성.
    const openVidu = new OpenVidu();
    setOpenVidu(openVidu);

    // 세션 초기화
    const mySession = openVidu.initSession();
    setSession(mySession);
    // 이벤트 설정
    mySession.on('streamCreated', (event) => {
      console.log(event)
      const subscriber = mySession.subscribe(event.stream, 'video-container');
      setSubscribers([...subscribers, subscriber]);
    });

    // 누군가 나감
    mySession.on('streamDestroyed', (event) => {
      console.log(event)
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    // 메세지 받기
    mySession.on('signal', (event) => {
      const data = event.data;
      const from = JSON.parse(event.from.data).nickname;
      setMessages((messages) => [...messages, { from, data }]);
    });

    // --- 4) Connect to the session with a valid user token ---
    mySession
      .connect(token, { clientData: {idx: params.id,token:token} })
      .then(() => {
        // --- 5) Get your own camera stream ---
        if (role === 'publisher') {
          const newPublisher = openVidu.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam: screen으로 설정하면 화면공유
            publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: false, // Whether you want to start publishing with your video enabled or not
            insertMode: undefined, // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });
          mySession.publish(newPublisher);
          setPublisher(() => newPublisher);
        }
      })
      .catch((error) => {
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message
        );
      });
  };

  const audioToggle = () => {
    const newAudioEnabled = !audioEnabled;
    setAudioEnabled(newAudioEnabled);
    publisher.publishAudio(newAudioEnabled);
  };

  const screenToggle = () => {
    const newVideoEnabled = !videoEnabled;
    let newPublisher;
    if (newVideoEnabled) {
      newPublisher = openVidu.initPublisher('video-container', {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: 'screen', // The source of video. If undefined default webcam: screen으로 설정하면 화면공유
        publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false, // Whether to mirror your local video or not
      });

      // --- 6) Publish your stream ---

      if (publisher) {
        session.unpublish(publisher).then(() => session.publish(newPublisher));
      } else {
        session.publish(newPublisher);
      }

      // Set the main video in the page to display our webcam and store our Publisher
      setPublisher(() => newPublisher);
      console.log(publisher);
    } else {
      publisher.publishVideo(newVideoEnabled);
    }
    setVideoEnabled(newVideoEnabled);
  };

  const leaveSession = async () => {
    console.log("leave session")
    console.log(sessionRef.current)
    if (sessionRef.current) {
      sessionRef.current.disconnect();
      // const result = await deleteSessionRequest(params.id, token);
      // console.log("위에 안보내져")
      // console.log(result);
    }
    // console.log("Asdfadf")
    // navigate(`/article/${params.id}/`);
  };

  const creaetSession = async () => {
    const result= await createSessionRequest(params.id);
    if (result?.message == "success") {
      // 세션에 접속한다.
      token = result.result;
      joinSession('publisher') 
    } else {
      alert("Err");
    }
  }

  const printSession = () => {
    console.log(session);
    console.log(sessionRef.current);
  }

  const closeWindow = (e) => {
    // e.preventDefault();
    // e.returnValue = '';
    // console.log(session)
    // console.log(sessionRef.current)
    if(sessionRef.current) {
      sessionRef.current.disconnect()
    }
    

  };


  // 세션 상태 업데이트
  useEffect(() => {
    // return () => {
      console.log("uuuuuuuuuuuuuuuuuuupdate")
      sessionRef.current = session;
    // }
  }, [session])
 

  useEffect(() => {
    console.log("이게 업데이트야???????????")
    window.addEventListener("beforeunload", closeWindow);  
    
    // 만약, 세션이 없다면, 서버에서 세션을 만들고.
    if(!session) {
      creaetSession();
    }

    return () => {
      window.removeEventListener("beforeunload", closeWindow);
      leaveSession();
    };
  }, []);
  console.log("렌더")
  return (
    <div id='session'>
      <div id='session-header'>
        <h1 id='session-title'>{`Session ${params.id}`}</h1>
      </div>
      <Button variant='contained' onClick={leaveSession}>
        LeaveSession
      </Button>
      <Button onClick={printSession}>
        세션 출력
      </Button>
      {role === 'publisher' ? (
        <div>
          <Button variant='contained' onClick={audioToggle}>
            {audioEnabled ? '마이크 끄기' : '마이크 켜기'}
          </Button>
          <Button variant='contained' onClick={screenToggle}>
            {videoEnabled ? '화면공유 끄기' : '화면공유 켜기'}
          </Button>
        </div>
      ) : null}
      <div className='session-content'>
        <div id='video-container'></div>
        <div className='chat-box'>
          <ul>
            {messages.map((message, idx) => {
              return (
                <MessageItem
                  key={idx}
                  from={message.from}
                  data={message.data}
                />
              );
            })}
          </ul>
          <form className='chat-input' onSubmit={sendMessage}>
            <input type='text' onChange={changeMessage} value={inputMessage} />
            <button type='submit'>전송</button>
          </form>
        </div>
        <div>
          <h3>참가자 목록</h3>
          {/* {subscribers ? subscribers.map((subscriber) => <p>{subscriber}</p>) : null} */}
        </div>
      </div>
    </div>
  );
};

export default ScreenShare;
