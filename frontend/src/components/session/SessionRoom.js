/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import Button from '@mui/material/Button';
import MessageItem from './MessageItem';
import '@/styles/session.scss';

const SessionRoom = () => {
  const params = useParams();
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    { from: 'system', data: '환영합니다!' },
  ]);


  const [role, setRole] = useState('publisher');
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


  

  const videoToggle = () => {
    const newVideoEnabled = !videoEnabled;
    setVideoEnabled(newVideoEnabled, 'screen');
    publisher.publishVideo(newVideoEnabled);
  }

  

  

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



  const printSession = () => {
    console.log(session);
    console.log(sessionRef.current);
  }
  const pringParticipants = () => {
    console.log(participants);
  }







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
          <Button variant='contained' >
            {audioEnabled ? '마이크 끄기' : '마이크 켜기'}
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
