/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import Button from '@mui/material/Button';
import MessageItem from './MessageItem';
import { createSessionRequest, closeSessionRequest} from '@/services/sessionService';
import '@/styles/session.scss';

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
  const [participants, setParticipants] = useState([]);
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

    // 유저 입장
    mySession.on("connectionCreated", (event) => {
      console.log("connecion CREATEDddddddddddddddddddddddd");
      let data = event.connection.data.split("%/%")
      let user = JSON.parse(data[1]);
      console.log(user);
      setParticipants( prevArr => [...prevArr, user]); 
    })

    // 유저 퇴장
    mySession.on("connectionDestroyed", (event) => {
      console.log(event);
      let data = event.connection.data.split("%/%")
      let user = JSON.parse(data[1]);
      console.log(user.nickname);
      setParticipants((participants) => participants.filter((e)=>(e.nickname != user.nickname)))
    })

    // 영상 or 음성 활성화
    mySession.on('streamCreated', (event) => {
      console.log("streamCreated on Sessionnnnnnnnnnnnnnnnnnn")
      console.log(event)

      // '내'가 구독할 stream
      const subscriber = mySession.subscribe(event.stream, 'video-container');

      // 타인이 공유하는 것을 내가 본다.
      subscriber.on('videoElementCreated', event => {
        console.log("subscriber videoElementCreated")
			});

			// 타인이 공유
			subscriber.on('videoElementDestroyed', event => {
        console.log("subscriber videoElementDestroyed")

			});

      setSubscribers([...subscribers, subscriber]);
    });

    // 통신 중단 ( 내가 구독하는 것만 이벤트 받음)
    mySession.on('streamDestroyed', (event) => {
      console.log("streamDestroyed on Sessssssssssssssssssssssion")
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
      .connect(token, { clientData: {idx: params.id, token:token} })
      .then(() => {
        console.log("연결 되었다!")

        // 만약 내가 글 작성자라면
        // let newPublisher = openVidu.initPublisher('video-container',{ 
        //   videoSource: 'screen',
        //   resolution: '640x480',
        //   publishAudio: true,
        //   publishVideo: false,
        // })

        // mySession.publish(newPublisher);
        // setPublisher(() => newPublisher);
        


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

  const videoToggle = () => {
    const newVideoEnabled = !videoEnabled;
    setVideoEnabled(newVideoEnabled, 'screen');
    publisher.publishVideo(newVideoEnabled);
  }

  const screenToggle = () => {
    const newVideoEnabled = !videoEnabled;
    // 킨다
    if (newVideoEnabled) {
      let newPublisher = openVidu.initPublisher('video-container', {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: 'screen', // The source of video. If undefined default webcam: screen으로 설정하면 화면공유
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false, // Whether to mirror your local video or not
      });

      // 내가 공유한 것을 내가 본다.
      newPublisher.on('videoElementCreated', event => {
        console.log("publishre on videoElementCreated")

      });

      // 내가 공유한 것을 내가 취소한다.
      newPublisher.on('videoElementDestroyed', event => {
        // Add a new HTML element for the user's name and nickname over its video
        console.log("publishre on videoElementDestroyed")
      });

      // 화면 공유 킨다.
      session.publish(newPublisher);
      setPublisher(newPublisher);
    } else {
      // 끈다
      session.unpublish(publisher);
      setPublisher(null);
    }
    setVideoEnabled(newVideoEnabled);
  };

  const leaveSession = async () => {
    console.log("leave session")
    console.log(sessionRef.current)
    if (sessionRef.current) {
      sessionRef.current.disconnect();
    }
  };

  const closeSession = async () => {
    const result= await closeSessionRequest(params.id);
    console.log(result);
    if (result?.message == "success") {
      // 리다이렉트
      location.href = "/";
    } else {
      alert("Err");
    }
  }

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
  const pringParticipants = () => {
    console.log(participants);
  }

  const closeWindow = (e) => {
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
        <div>
          <h3>참가자 목록</h3>
          <ul id="user-list">
            {participants.map(item => <li key={item.nickname}>{item.rank} : {item.nickname}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScreenShare;
