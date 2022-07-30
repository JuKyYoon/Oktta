import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import Button from '@mui/material/Button';
import MessageItem from '../components/MessageItem';


const ScreenShare = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.userId);
  const { role, ovToken } = useSelector(state => state.article);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([{ from: 'system', data: '환영합니다!' }]);
  const [session, setSession] = useState('');
  const [publisher, setPublisher] = useState('');
  const [subscribers, setSubscribers] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [OV, setOV] = useState();

  const changeMessage = (event) => {
    setInputMessage(event.target.value)
  }

  const sendMessage = (event) => {
    event.preventDefault()
    if (inputMessage) {
      session.signal({
        data: inputMessage,
      })
        .then(() => {
          setInputMessage('')
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  const deleteSubscriber = (streamManager) => {
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
    };
  };

  const joinSession = (role, token) => {
    // --- 1) Get an OpenVidu object ---
    
    const OV = new OpenVidu();
    setOV(OV)
    
    // --- 2) Init a session ---
    var mySession = OV.initSession();
    setSession(mySession);
    
    // --- 3) Specify the actions when events take place in the session ---
    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers([...subscribers, subscriber])
      
      // Update the state with the new subscribers
      setSubscribers(subscribers);
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
      const from = JSON.parse(event.from.data.split('%/%')[0]).clientData;
      setMessages((messages) => [...messages, { from, data }])
    });
    
    // --- 4) Connect to the session with a valid user token ---
    mySession
    .connect(
      token,
      { clientData: userId }
      )
      .then(() => {

        // --- 5) Get your own camera stream ---

      })
      .catch((error) => {
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
  }

  const audioToggle = () => {
    const newAudioEnabled = !audioEnabled
    setAudioEnabled(newAudioEnabled);
    publisher.publishAudio(newAudioEnabled);
  }

  const screenToggle = () => {
    const newVideoEnabled = !videoEnabled
    let newPublisher
    if (newVideoEnabled) {
      newPublisher = OV.initPublisher('video-container', {
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
        session.unpublish(publisher).then(() => session.publish(newPublisher))
      } else {
        session.publish(newPublisher);
      }

      // Set the main video in the page to display our webcam and store our Publisher
      setPublisher(() => newPublisher);
      console.log(publisher)
    } else {
      publisher.publishVideo(newVideoEnabled);
    }
    setVideoEnabled(newVideoEnabled);
  }

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    navigate(`/article/${params.id}/`)

    // delete 요청 날리기
    setSession(undefined);
    setSubscribers([]);
    setPublisher(undefined);
    setOV(null);
  }

  useEffect(() => {
    joinSession(role, ovToken);
  }, []);
  
  return (
    <div id="session">
      <div id="session-header">
        <h1 id="session-title">{`Session ${params.id}`}</h1>
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
      <Button
        variant="contained"
        onClick={screenToggle}
      >
        {videoEnabled ? '화면공유 끄기' : '화면공유 켜기'}
      </Button>
      <div className='session-content'>
        <div id="video-container"></div>
        <div className="chat-box">
          <ul>
            {messages.map((message, idx) => {
              return <MessageItem key={idx} from={message.from} data={message.data}/>
            })}
          </ul>
          <form className='chat-input' onSubmit={sendMessage}>
            <input type="text" onChange={changeMessage} value={inputMessage} />
            <button type='submit'>전송</button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default ScreenShare;
