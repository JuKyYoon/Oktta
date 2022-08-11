/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { createSessionRequest, closeSessionRequest} from '@/services/sessionService';
import {useSelector} from 'react-redux'
import { OpenVidu } from "openvidu-browser";
import Button from "@mui/material/Button";
import MessageItem from "./MessageItem";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import "@/styles/session.scss";

const ScreenShare = () => {
  const params = useParams();
  const [session, setSession] = useState(null);
  const sessionRef = useRef();

  const [participants, setParticipants] = useState([
    { nickname: "samsung", rank: 1, connectionId: "conid1" },
    { nickname: "apple", rank: 1, connectionId: "conid2" },
    { nickname: "blackberry", rank: 1, connectionId: "conid3" },
    { nickname: "sony", rank: 1, connectionId: "conid4" },
  ]);

  const [chat, setChat] = useState([
    { nickname: "samsung", content: "hi0", me: false, time: "15:12" },
    { nickname: "samsung", content: "hi1", me: false, time: "15:14" },
    { nickname: "apple", content: "hi1", me: true, time: "15:14" },
    { nickname: "samsung", content: "hi2", me: false, time: "15:14" },
    { nickname: "samsung", content: "hi3", me: false, time: "15:15" },
  ]);

  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [openVidu, setOpenVidu] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [role, setRole] = useState("publisher");
  const [open, setOpen] = useState(false);
  const [owner, setOwner] = useState(false);
  const [publisher, setPublisher] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  let token = "";
  let myName = useSelector(state => state.user.nickname);

  const toggleDrawer = (isOpen) => (event) => {
    // 닫을려고 할 때
    if (!isOpen) {
      if (
        event.type === "click" ||
        (event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift"))
      ) {
        return;
      }
    }

    setOpen(isOpen);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <div>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />

      <List>
        {participants.map((user, index) => (
          <ListItem key={user.connectionId} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={user.nickname} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button onClick={handleDrawerClose}>닫기</Button>
    </Box>
  );

  const deleteSubscriber = (streamManager) => {
    const index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers(subscribers);
    }
  };

  const joinSession = () => {
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
      user.audioActive = false;
      user.connectionId = event.connection.connectionId;
      user.role = event.connection.role ? event.connection.role : "publisher";
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

    mySession.on('streamPropertyChanged', (event) => {
      console.log('streamPropertyChanged')
      // 유저 찾기
      if(event.changedProperty === "audioActive") {
        let userId = event.target.connection.connectionId;
        setParticipants((participants) => 
          participants.map(e => 
            e.connectionId == userId ? {...e, audioActive : event.newValue } : e
          )
        )
      }
    })

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
      console.log(event)
      const data = event.data;
      let from = event.from.data.split("%/%")[1]
      let msgNickname = JSON.parse(from).nickname;
      let msgTime = new Date().toTimeString().substr(0,5);
      let msg = { nickname: msgNickname, content: event.data, me: msgNickname == myName, time: msgTime }
      // const from = JSON.parse(event.from.data).nickname;
      setChat((chat) => [...chat, msg]);
    });

    // --- 4) Connect to the session with a valid user token ---
    mySession
      .connect(token, { clientData: {idx: params.id, token:token} })
      .then(() => {
        console.log("연결 되었다!")

        // 전원 자신의 오디오를 publish 한다.
        let audioPublisher = openVidu.initPublisher('audio-container', {
          videoSource: false,
          audioSource: undefined, // The source of audio. If undefined default microphone
          publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: false, // Whether you want to start publishing with your video enabled or not
        });
        console.log("Audio Activated")
        mySession.publish(audioPublisher);
        setPublisher(audioPublisher);
        


      })
      .catch((error) => {
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message
        );
      });
  };

  /**
   * 음소거
   */
  const audioToggle = () => {
    const newAudioEnabled = !audioEnabled;
    setAudioEnabled(newAudioEnabled);
    publisher.publishAudio(newAudioEnabled);
  };

  /**
   * 오디오 스트림 연결
   */
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
    setAudioEnabled(false); 
    session.publish(audioPublisher);
    setPublisher(audioPublisher);
  }

  /**
   * 화면 공유 스트림 연결
   */
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
          resolution: '1280x720', // The resolution of your video
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

  /**
   * 화면 나갈 때 작동
   */
  const leaveSession = async () => {
    console.log("leave session")
    // publishing 하고있는거 취소하고 나가기!!!!!
    // publisher state에 어떻게 접근하지????????????
    console.log(sessionRef.current)
    if (sessionRef.current) {
      sessionRef.current.disconnect();
    }
  };

  /**
   * 브라우저 닫히면 작동
   */
  const closeWindow = (e) => {
    if(sessionRef.current) {
      sessionRef.current.disconnect()
    }
  };

  /**
   * 세션 생성 or 입장한다.
   */
  const creaetSession = async () => {
    const result= await createSessionRequest(params.id);
    if (result?.message == "owner") {
      // 세션에 접속한다.
      token = result.result;
      setOwner(true);
      joinSession() 
    } else if (result?.message == "participant") {
      token = result.result;
      joinSession() 
    } else {
      console.log(result)
      alert("Err");
    }
  }
  
  const onChangeMessage = (event) => {
    setInputMessage(event.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if(inputMessage.trim().length != 0 && session) {
      console.log(inputMessage)
      session.signal({
        data: inputMessage.trim()
      }).then(() => {
        setInputMessage(' ');
      }).catch((err) => {
        console.log("send message fail")
        console.log(err)
      })
    }
  }

  // 세션 상태 업데이트
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);


  useEffect(() => {
    window.addEventListener("beforeunload", closeWindow);
    if (!session) {
      console.log("세션 입장");
      creaetSession();
    }

    return () => {
      window.removeEventListener("beforeunload", closeWindow);
      leaveSession();
    };
  }, []);


  // console.log("렌더링 했습니다.");

  return (
    <div id="main-session">
      <div id="video-div">
        <div id="title-div">타이틀</div>

        <div id="video-container">
          {/* <video autoPlay loop>
            <source src="/flower.webm" type="video/webm" />
            Sorry, your browser doesn't support embedded videos.
          </video> */}
        </div>

        <div id="session-button-div">
          <Button className="user-session-button" variant="contained" onClick={audioToggle}>
            {audioEnabled ? "음소거 하기" : "마이크 켜기"}
          </Button>
          <Button className="user-session-button" variant="contained">
            손들기
          </Button>
          {owner ? 
            <Button className="user-session-button" variant='contained' onClick={screenToggle}>
              {videoEnabled ? '화면공유 끄기' : '화면공유 켜기'}
            </Button> : null}
          <Button className="show-session-user" onClick={toggleDrawer(true)}>
            참가자 보기
          </Button>
        </div>
      </div>
      <div id="chat-div">
        <div id="chatting-list">
          {chat.map((item, index) => (
            <div className={item.me ? "my-chat" : "other-chat"} key={index}>
              <div className="chat-nickname">{item.nickname}</div>
              <div className="chat-content">{item.content}</div>
            </div>
          ))}
        </div>
        <div id="chatting-input">
          <TextField
            id="standard-multiline-static"
            multiline
            style={{ margin: "0", width: "100%" }}
            margin="none"
            rows={2}
            placeholder="chatting"
            value={inputMessage}
            onChange={onChangeMessage}
            variant="standard"
          />
          <Button variant="contained" onClick={sendMessage}>보내기</Button>
        </div>
      </div>
      <Drawer
        anchor="right"
        variant="temporary"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
};

export default ScreenShare;
