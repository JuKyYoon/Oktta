/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import Button from '@mui/material/Button';
import MessageItem from './MessageItem';
import { createSessionRequest, closeSessionRequest} from '@/services/sessionService';
import '@/styles/session.scss';

const SessionRoom = () => {
  const params = useParams();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { from: 'system', data: '환영합니다!' },
  ]);


  const [role, setRole] = useState('publisher');
  const [publisher, setPublisher] = useState('');
  const [participants, setParticipants] = useState([]);


  let token = "";
  let isOwner = false;

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

  

  const videoToggle = () => {
    const newVideoEnabled = !videoEnabled;
    setVideoEnabled(newVideoEnabled, 'screen');
    publisher.publishVideo(newVideoEnabled);
  }

  const publishOnlyAudio = () => {
    if(publisher) {
      console.log("here?")
      session.unpublish(publisher);
      setPublisher(null);
    }

    let audioPublisher = openVidu.initPublisher('audio-container', {
      videoSource: false,
      audioSource: undefined, // The source of audio. If undefined default microphone
      publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: false, // Whether you want to start publishing with your video enabled or not
    });
    console.log("Audio Activated")
    
    session.publish(audioPublisher);
    setPublisher(audioPublisher);
  }

  const screenToggle = async () => {
    const newVideoEnabled = !videoEnabled;

    if (newVideoEnabled) {
      let mediaDevices = navigator.mediaDevices;
      
      mediaDevices.getUserMedia({
        video: false, audio: true
      }).then((screenStream) => {
        // let screenVideoTrack = screenStream.getVideoTracks()[0];
        let screenAudioTrack = screenStream.getAudioTracks()[0];

        let screenPublisher = openVidu.initPublisher('video-container', {
          audioSource: screenAudioTrack, // The source of audio. If undefined default microphone
          videoSource: 'screen', // The source of video. If undefined default webcam: screen으로 설정하면 화면공유
          publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: '640x480', // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });
  
        // 내가 공유한 것을 내가 본다.
        screenPublisher.on('videoElementCreated', event => {
          console.log("publishre on videoElementCreated")
        });
        
        // 내가 공유한 것을 내가 취소한다.
        screenPublisher.on('videoElementDestroyed', event => {
          // Add a new HTML element for the user's name and nickname over its video
          console.log("publishre on videoElementDestroyed")
        });
  
        // 권한 허용
        screenPublisher.once('accessAllowed', (event) => {
          // It is very important to define what to do when the stream ends.
          console.log("alloweeeeeeeeeeeeeed")
          screenPublisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
              console.log('User pressed the "Stop sharing" button');
              session.unpublish(screenPublisher);
              setPublisher(null);
              setVideoEnabled(false);
          });
          // 만약 뭔가 publish 하고 있다면 취소한다.
          if(publisher) {
            session.unpublish(publisher);
            setPublisher(null);
          }

          session.publish(screenPublisher);
          setPublisher(screenPublisher);
        });
  
        screenPublisher.once('accessDenied', (event) => {
          setVideoEnabled(false);
          return;
        });
      }).catch((err) => {
        console.log(err)
        setVideoEnabled(false);
      })
    } else {
      // 오디오 퍼블리서로 전환시킨다.
      console.log("취소했자나")
      publishOnlyAudio();
    }
    setVideoEnabled(newVideoEnabled);
  };

  const leaveSession = async () => {
    console.log("leave session")
    // publishing 하고있는거 취소하고 나가기!!!!!
    // publisher state에 어떻게 접근하지????????????
    console.log(sessionRef.current)
    if (sessionRef.current) {
      sessionRef.current.disconnect();
    }
  };

  const closeSession = async () => {
    // const result= await closeSessionRequest(params.id);
    location.href = "/";
    console.log(result);
    if (result?.message == "success") {
      // 리다이렉트
    } else {
      alert("Err");
    }
  }

  const creaetSession = async () => {
    const result= await createSessionRequest(params.id);
    if (result?.message == "owner") {
      // 세션에 접속한다.
      token = result.result;
      isOwner = true;
      joinSession() 
    } else if (result?.message == "participant") {
      token = result.result;
      joinSession() 
    } else {
      console.log(result)
      alert("Err");
    }
  }

  const printSession = () => {
    console.log(session);
    console.log(sessionRef.current);
  }
  const pringParticipants = () => {
    console.log(participants);
  }

  const closeWindow = (e) => {
    if(sessionRef.current) {
      sessionRef.current.disconnect()
    }
  };





  return (
    <div id='session'>
              <div>
          <h3>참가자 목록</h3>
          <ul id="user-list">
            {participants.map(item => <li key={item.connectionId}>{item.rank} : {item.nickname} : {item.role} : { item.audioActive ? "on" : "off"}</li>)}
          </ul>
        </div>
      <div id='session-header'>
        <h1 id='session-title'>{`Session ${params.id}`}</h1>
      </div>
      <Button variant='contained' onClick={leaveSession}>
        LeaveSession
      </Button>
      <Button variant='contained' onClick={closeSession}>
        CloseSession
      </Button>
      <Button onClick={printSession}>
        세션 출력
      </Button>
      <Button onClick={pringParticipants}>
        유저 출력
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
        <div id='audio-container'></div>
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

      </div>
    </div>
  );
};

export default SessionRoom;
