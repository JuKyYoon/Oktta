import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Grid, Tooltip, Chip } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import Typography from '@mui/material/Typography';
import { createSessionRequest, startRecording, stopRecording, closeSession } from '@/services/sessionService';
import { tier } from '@/const/tier';
import SessionVote from '@/components/session/SessionVote';
import '@/styles/session.scss';

const ScreenShare = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const sessionRef = useRef();

  const [participants, setParticipants] = useState([
    // { nickname: 'samsung', rank: 24, connectionId: 'conid1', audioActive: false, isSpeaking: false},
    // { nickname: 'apple', rank: 54, connectionId: 'conid2', audioActive: false, isSpeaking: false },
    // { nickname: '일이삼사일이삼사삼사', rank: 0, connectionId: 'conid3', audioActive: true, isSpeaking: true },
    // { nickname: 'sony', rank: 94, connectionId: 'conid4', audioActive: false, isSpeaking: true },
  ]);

  const [chat, setChat] = useState([
    // { nickname: 'samsung', content: '<p>hi0dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>', me: false, time: '15:12' },
    // { nickname: 'samsung', content: 'hi1', me: false, time: '15:14' },
    // { nickname: 'apple', content: 'hi1', me: true, time: '15:14' },
    // { nickname: 'samsung', content: 'hi2', me: false, time: '15:14' },
    // { nickname: 'samsung', content: 'hi3', me: false, time: '15:15' },
    // { nickname: 'samsung', content: 'hi0', me: false, time: '15:12' },
    // { nickname: 'samsung', content: 'hi1', me: false, time: '15:14' },
    // { nickname: 'apple', content: 'hi1', me: true, time: '15:14' },
    // { nickname: 'samsung', content: 'hi2', me: false, time: '15:14' },
    // { nickname: 'samsung', content: 'hi3', me: false, time: '15:15' },
    // { nickname: 'samsung', content: 'hi0', me: false, time: '15:12' },
    // { nickname: 'samsung', content: 'hi1', me: false, time: '15:14' },
    // { nickname: 'apple', content: 'hi1', me: true, time: '15:14' },
    // { nickname: 'samsung', content: 'hi2', me: false, time: '15:14' },
    // { nickname: 'samsung', content: 'hi3', me: false, time: '15:15' },
    // { nickname: 'samsung', content: 'hi0', me: false, time: '15:12' },
    // { nickname: 'samsung', content: 'hi1', me: false, time: '15:14' },
    // { nickname: 'apple', content: 'hi1', me: true, time: '15:14' },
    // { nickname: 'samsung', content: 'hi2', me: false, time: '15:14' },
    // { nickname: 'samsung', content: 'hi3', me: false, time: '15:15' },
    // { nickname: 'apple', content: 'hi1', me: true, time: '15:14' },
    // { nickname: 'samsung', content: 'hi2', me: false, time: '15:14' },
    // { nickname: 'samsung', content: 'hi3', me: false, time: '15:15' },
    // { nickname: 'samsung', content: 'hi0', me: false, time: '15:12' },
    // { nickname: 'samsung', content: 'hi1', me: false, time: '15:14' },
    // { nickname: 'apple', content: 'hi1', me: true, time: '15:14' },
    // { nickname: 'samsung', content: 'hi2', me: false, time: '15:14' },
    // { nickname: 'samsung', content: 'hi3', me: false, time: '15:15' },
  ]);

  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [openVidu, setOpenVidu] = useState();
  const [role, setRole] = useState('publisher');
  const [owner, setOwner] = useState(false);
  const [publisher, setPublisher] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [title, setTitle] = useState('제목');
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(true);
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [openVote, setOpenVote] = useState(false);

  const [recordingId, setRecordingId] = useState('');
  const [recordingResponse, setRecordingResponse] = useState(false);

  const scrollRef = useRef();

  let token = '';
  let myName = useSelector(state => state.user.nickname);
  let AudioContext;
  let audioContext;

  const joinSession = () => {
    console.log(token)
    // OpenVidu 객체 생성.
    const openVidu = new OpenVidu();
    openVidu.enableProdMode();
    setOpenVidu(openVidu);

    // 세션 초기화
    const mySession = openVidu.initSession();
    setSession(mySession);

    // 유저 입장
    mySession.on('connectionCreated', (event) => {
      console.log('connecion CREATEDddddddddddddddddddddddd');
      console.log(event);
      let data = event.connection.data.split('%/%')
      let user = JSON.parse(data[1]);
      console.log(user);
      user.audioActive = false;
      user.isSpeaking = false;
      user.connectionId = event.connection.connectionId;
      user.role = event.connection.role ? event.connection.role : 'publisher';
      setParticipants( prevArr => [...prevArr, user]); 
    })

    // 유저 퇴장
    mySession.on('connectionDestroyed', (event) => {
      console.log(event);
      let data = event.connection.data.split('%/%')
      let user = JSON.parse(data[1]);
      console.log(user.nickname);
      setParticipants((participants) => participants.filter((e)=>(e.nickname != user.nickname)))
    })

    // 영상 or 음성 활성화
    mySession.on('streamCreated', (event) => {
      console.log('streamCreated on Sessionnnnnnnnnnnnnnnnnnn')
      console.log(event)
      const connectionId = event.stream.connection.connectionId;

      setParticipants((participants) => 
        participants.map(e => 
          e.connectionId == connectionId ? {...e, audioActive : event.stream.audioActive} : e
        )
      )

      // '내'가 구독할 stream
      // 종류에 따라서 video-audio 나눠주기
      if(event.stream.hasVideo) {
        const subscriber = mySession.subscribe(event.stream, 'video-container');

  
        // 타인이 공유하는 것을 내가 본다.
        subscriber.on('videoElementCreated', event => {
          console.log('subscriber videoElementCreated')
        });
  
        // 타인이 공유
        subscriber.on('videoElementDestroyed', event => {
          console.log('subscriber videoElementDestroyed')
        });
      } else {
        const subscriber = mySession.subscribe(event.stream, 'audio-container');
        console.log(subscriber)

        subscriber.on('videoElementCreated', event => {
          console.log('subscriber audioElementCreated')
          // event.element.play();
          // var video = document.getElementById("hidden-video").play();
        });
  
        // 타인이 공유
        subscriber.on('videoElementDestroyed', event => {
          console.log('subscriber audioElementDestroyed')
        });

        subscriber.on('streamPlaying', event => {
          console.log('!!!!!!!!!!!!!stream playing!!!!!!!!!!!!!!!!!!')
          console.log(event);
          // const audioId = event.target.id;
          // try {
          //   document.getElementById(audioId).play();
          // } catch(err) {
          //   console.log(err)
          // }
        });
      }

    });

    mySession.on('streamPropertyChanged', (event) => {
      console.log('streamPropertyChanged')
      // 유저 찾기
      if(event.changedProperty === 'audioActive') {
        let userId = event.stream.connection.connectionId;
        setParticipants((participants) => 
          participants.map(e => 
            e.connectionId == userId ? {...e, audioActive : event.newValue } : e
          )
        )
      }
    })

    mySession.on("publisherStartSpeaking", (event) => {
      // console.log("speaking Start-----------------------------------")
      const spekingId = event.connection.connectionId;
      setParticipants((participants) => 
        participants.map(e => 
          e.connectionId == spekingId ? {...e, isSpeaking : true } : e
        )
      )
      // console.log("-----------------------------------")
    })

    mySession.on("publisherStopSpeaking", (event) => {
      // console.log("-----------------------------speaking stop------")
      const spekingId = event.connection.connectionId;
      setParticipants((participants) => 
        participants.map(e => 
          e.connectionId == spekingId ? {...e, isSpeaking : false } : e
        )
      )
      // console.log("-----------------------------------")
    })

    mySession.on('sessionDisconnected', (event) => {
      // 수정 중 입니다.
      if(event?.reaseon === "sessionClosedByServer") {
        alert("호스트에 의해 종료되었습니다.")
      } else {
        alert("연결이 종료되었습니다.")
      }
      sessionRef.current = null;
      navigate("/")
    })

    // mySessino.on('session')


    // 통신 중단 ( 내가 구독하는 것만 이벤트 받음)
    // 스스로 통신을 중단할 수 없으며, 스스로 stream 교체 만 가능하다.
    mySession.on('streamDestroyed', (event) => {
      console.log('streamDestroyed on Sessssssssssssssssssssssion')
      console.log(event)
      // const connecionId = event.stream.connect.connectionId;
      // setParticipants((participants) => 
      //     participants.map(e => 
      //       e.connectionId == connecionId ? {...e, audioActive : false } : e
      //     )
      // )
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    // 시그널 수신
    mySession.on('signal', (event) => {
      console.log(event)
      if(event.type == 'signal:hands') {
        let from = event.data;
        let msgTime = new Date().toTimeString().substr(0,5);
        let msg = { nickname: myName, content: `${from}(이)가 손을 들었습니다.`, me: true, time: msgTime }
        setChat((chat) => [...chat, msg]);

      } else if (event.type == 'signal:chatting') {
        const data = event.data;
        let from = event.from.data.split('%/%')[1]
        let msgNickname = JSON.parse(from).nickname;
        let msgTime = new Date().toTimeString().substr(0,5);
        let msg = { nickname: msgNickname, content: event.data, me: msgNickname == myName, time: msgTime }
        setChat((chat) => [...chat, msg]);
      }
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    });

    // --- 4) Connect to the session with a valid user token ---
    mySession
      .connect(token, { clientData: {idx: params.id, token:token} })
      .then(() => {
        console.log('연결 되었다!')

        // 전원 자신의 오디오를 publish 한다.
        let audioPublisher = openVidu.initPublisher('audio-container', {
          videoSource: false,
          audioSource: undefined, // The source of audio. If undefined default microphone
          publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: false, // Whether you want to start publishing with your video enabled or not
          insertMode: 'APPEND',
        });
        console.log('Audio Activated')

        // 여기서 권한을 요청함. 그거에 따라서 
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
    if(publisher) {
      publisher.publishAudio(newAudioEnabled);
    }
  };

  /**
   * 오디오 스트림 연결
   */
  const publishOnlyAudio = () => {
    if(publisher) {
      console.log('here?')
      session.unpublish(publisher);
      setPublisher(null);
    }

    let audioPublisher = openVidu.initPublisher('audio-container', {
      videoSource: false,
      audioSource: undefined, // The source of audio. If undefined default microphone
      publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: false, // Whether you want to start publishing with your video enabled or not
      insertMode: 'APPEND',
    });
    console.log('Audio Activated')
    setAudioEnabled(false); 
    session.publish(audioPublisher);
    setPublisher(audioPublisher);
    setParticipants((participants) => 
      participants.map(e => 
        e.nickname == myName ? {...e, audioActive : false } : e
      )
    )
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
          frameRate: 60, // The frame rate of your video
          insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });
  
        // 내가 공유한 것을 내가 본다.
        screenPublisher.on('videoElementCreated', event => {
          console.log('publishre on videoElementCreated')
        });
        
        // 내가 공유한 것을 내가 취소한다.
        screenPublisher.on('videoElementDestroyed', event => {
          // Add a new HTML element for the user's name and nickname over its video
          console.log('publishre on videoElementDestroyed')
        });
  
        // 권한 허용
        screenPublisher.once('accessAllowed', (event) => {
          // It is very important to define what to do when the stream ends.
          console.log('alloweeeeeeeeeeeeeed')
          screenPublisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
              console.log('User pressed the "Stop sharing" button');
              session.unpublish(screenPublisher);
              setPublisher(null);
              setVideoEnabled(false);
              setAudioEnabled(false);
              publishOnlyAudio();
          });
          // 만약 뭔가 publish 하고 있다면 취소한다.
          if(publisher) {
            session.unpublish(publisher);
            setPublisher(null);
          }

          session.publish(screenPublisher);
          setPublisher(screenPublisher);
          setAudioEnabled(false);
          setParticipants((participants) => 
            participants.map(e => 
              e.nickname == myName ? {...e, audioActive : false } : e
            )
          )
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
      console.log('취소했자나')
      publishOnlyAudio();
    }
    setVideoEnabled(newVideoEnabled);
  };

  /**
   * 화면 나갈 때 작동
   */
  const leaveSession = async () => {
    console.log('leave session')
    // publishing 하고있는거 취소하고 나가기!!!!!
    // publisher state에 어떻게 접근하지????????????
    console.log(sessionRef.current)
    if (sessionRef.current) {
      sessionRef.current.disconnect();
      sessionRef.current = null;
    }
  };

  /**
   * 브라우저 닫히면 작동
   */
  const closeWindow = (e) => {
    if(sessionRef.current) {
      sessionRef.current.disconnect();
      sessionRef.current = null;
    }
  };

  /**
   * 세션 생성 or 입장한다.
   */
  const creaetSession = async () => {
    const result= await createSessionRequest(params.id);
    if (result?.message == 'owner') {
      // 세션에 접속한다.
      token = result.token;
      setTitle(result.title);
      setOwner(true);
    
      joinSession() 
    } else if (result?.message == 'participant') {
      token = result.token;
      joinSession() 
    } else {
      console.log(result)
      alert('방 들어가기를 실패했습니다.');
      navigate("/")
    }
  }

  const destroySession = async () => {
    let res = confirm("진짜로 세션을 종료하시겠습니까?");
    if(res) {
      const result = await closeSession(params.id);
      console.log(result);
    }
  }
  
  const onChangeMessage = (event) => {
    if(event.target.value.length < 50){
      setInputMessage(event.target.value);
    }
  };
  const onPressMessage = (e) => {
    if(e.key ===  "Enter" && !e.shiftKey) {
      sendMessage()
    }
  }

  const handsUp = (e) => {
    e.preventDefault();
    if(session) {
      session.signal({
        data: myName,
        type: 'hands'
      }).then(() => {
        console.log('success')
      }).catch((err) => {
        console.log('hands up')
        console.log(err)
      })
    }
  }

  const sendMessage = (e) => {
    if(e) {
      e.preventDefault();
    }
    if(inputMessage.trim().length != 0 && session) {
      console.log(inputMessage)
      session.signal({
        data: inputMessage.trim(),
        type: 'chatting'
      }).then(() => {
        setInputMessage(' ');
      }).catch((err) => {
        console.log('send message fail')
        console.log(err)
      })
    }
  }

  const toggleUserList = () => {
    console.log('toggle User List')
    setLeftDrawerOpen(!leftDrawerOpen)
  }

  const showUserList = () => {
    participants.map(e => 
      console.log(e)
    )
  }

  const toggleChatList = () => {
    setRightDrawerOpen(!rightDrawerOpen);
  }

  const openVoteToggle = () => {
    setOpenVote(!openVote);
  }

  const closeVote = () => {
    setOpenVote(false)
  }

  const recordingToggle = async () => {
    if(recordingResponse) {
      return;
    }
    // console.log(sessionRef.current)
    if(!recordingStatus) {
      console.log("---------------------recording start----------------------")
      setRecordingResponse(true);
      // 레코딩 시작
      const result = await startRecording(params.id, sessionRef.current.sessionId);
      setRecordingResponse(false);
      
      console.log(result);
      if(result.message === "success") {
        setRecordingId(result.recording.id);
        setRecordingStatus(!recordingStatus);
      } else {
        alert('녹화 시작 실패')
      }
    } else {
      // 레코딩 중단
      console.log("---------------------recording stopppppppppp----------------------")
      setRecordingResponse(true);
      const result = await stopRecording(params.id, recordingId);
      setRecordingResponse(false);
      console.log(result);
      if(result.message === "success") {
        setRecordingStatus(!recordingStatus);
      } else {
        alert('녹화 중단 실패')
        setRecordingStatus(!recordingStatus);
      }
    }
  }

  // 세션 상태 업데이트
  useEffect(() => {
    sessionRef.current = session;
  }, [session]);


  useEffect(() => {
    window.addEventListener('beforeunload', closeWindow);

    window.onload = function() {
      console.log('audio check--------------------------------------------');
      navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
          AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContext = new AudioContext();

          
          if (!session) {
            console.log("세션 입장");
            creaetSession();
          }
      }).catch(e => {
        alert("소리 권한 허용해주세요")
        console.error(`Audio permissions denied: ${e}`);
      });
    }


    return () => {
      window.removeEventListener('beforeunload', closeWindow);
      leaveSession();
    };
  }, []);



  // console.log('렌더링 했습니다.');
  return (
    <Box sx={{ width: 1, height: '100%' }} style={{'backgroundColor' : 'none'}}>
      {!leftDrawerOpen? <Chip label="참여자" color="primary" onClick={toggleUserList} display={{ xs: "none", sm: "block" }} sx={{
        position: "absolute",
        zIndex: "1111",
        top: "15%"
      }}/> : null}

      <Grid container direction='row' sx={{ width: 1, height: 1, flexGrow: 1}} spacing={0}>
        <Slide direction="right" in={leftDrawerOpen} mountOnEnter unmountOnExit>
          <Grid item xs={1.8} zeroMinWidth className={'user-div'}  sx={{
            display: leftDrawerOpen ? 'block' : 'none'
          }}>
            <Box sx={{ height: '100%' }} style={{'backgroundColor' : 'none'}} display={{ xs: "none", sm: "block" }}>
              {/* <Button
                className="user-session-button"
                variant="contained"
                onClick={toggleUserList}
              >
                유저 목록 보기
              </Button> */}
              <List>
                {participants.map((user, index) => (
                <ListItem key={user.connectionId} disablePadding sx={{
                  boxShadow: user.isSpeaking ? "0px 0px 0px 5px #3f50e7 inset" : ""
                }}>
                  <ListItemButton>
                    <ListItemIcon>
                      {user.audioActive 
                      ? <MicIcon color="success"/> : <MicOffIcon color="error"/>}
                    </ListItemIcon>
                    <Tooltip title={<Typography fontSize={15}>{user.nickname}</Typography>} disableInteractive leaveTouchDelay={500} placement='right-end' sx={{
                        fontSize: '1rem'
                    }}>
                      <ListItemText
                        primary={user.nickname}
                        primaryTypographyProps={{ 
                        variant: 'subtitle2', 
                        style: {
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }
                      }}/>
                    </Tooltip>
                    <Tooltip  title={<Typography fontSize={12}>{tier[parseInt(user.rank/10)]}</Typography>} leaveTouchDelay={500} placement='right-start' sx={{
                      fontSize: '1rem'
                    }}>
                      <img style={{'marginLeft' : '5px', 'marginRight' : '5px'}} src={process.env.REACT_APP_CLIENT_URL + '/assets/lol_tiers_ico/' + parseInt(user.rank/10) +'.ico'}></img>

                    </Tooltip>
                  </ListItemButton>
                </ListItem> ))}
                <Divider />
                <ListItemButton onClick={toggleUserList}>숨기기</ListItemButton>
              </List>
            </Box>
          </Grid>
        </Slide>

        <Grid item xs={leftDrawerOpen ? 8.2 : 10} className={'video-div'} sx={{
          height: '100%'
        }}> 
          <Box sx={{ height: '100%' }} style={{'backgroundColor' : 'none'}} >
          <div id="video-container">
            {/* <video autoPlay muted>
              <source src="/flower.webm" type="video/webm" />
              Sorry, your browser doesn't support embedded videos.
            </video> */}
          </div>
          <div id="audio-container" style={{'visiblity': 'hidden', 'width' :0, 'height': 0}}>
          </div>
          <div id="session-button-div">
            <div className="button-div">
              {/* <span id="title-div">{title}</span> */}
              {/* <Button onClick={scrollDown}>
                채팅창다운
              </Button> */}
              {/* <Button
                className="user-session-button"
                variant="contained"
                onClick={showUserList}
              >
                유저 목록 보기 (Debug)
              </Button> */}
              <img
                src={`/assets/icons/vote.png`}
                className='session-button'
                onClick={openVoteToggle}
                width="50"
                />
              {audioEnabled ? 
                <img
                src={`/assets/icons/mic.png`}
                className='session-button'
                onClick={audioToggle}
                width="50"
                /> :
                <img
                src={`/assets/icons/mic-off.png`}
                className='session-button'
                onClick={audioToggle}
                width="50"
                />}

              {/* <Button
                className="user-session-button"
                variant="contained"
                onClick={toggleChatList}
              >
                채팅창 보기
              </Button> */}
              {owner ? 
                <>
                  {videoEnabled ? 
                    <img
                    src={`/assets/icons/share-video-off.png`}
                    className='session-button'
                    onClick={screenToggle}
                    width="50"
                    /> : 
                    <img
                    src={`/assets/icons/share-video.png`}
                    className='session-button'
                    onClick={screenToggle}
                    width="50"
                    />
                  }
                  {recordingResponse ? 
                    <img
                      src={`/assets/icons/record-disable.png`}
                      className='session-button'
                      width="50"
                    /> : <>{recordingStatus ?
                      <img
                      src={`/assets/icons/record-off.png`}
                      className='session-button'
                      onClick={recordingToggle}
                      width="50"
                      />
                      :
                      <img
                      src={`/assets/icons/record.png`}
                      className='session-button'
                      onClick={recordingToggle}
                      width="50"
                      />
                    }</> }
                  
                  <img
                  src={`/assets/icons/exit.png`}
                  className='session-button'
                  onClick={destroySession}
                  width="45"
                  />
                </> : 
                <img
                src={`/assets/icons/hand-up.png`}
                className='session-button'
                onClick={handsUp}
                width="50"
                />
                }
              </div>
            </div>
          </Box>

        </Grid>
        <Grid item xs={2} className={'chat-div'} sx={{
          display: rightDrawerOpen ? 'block' : 'none'
        }}>
          <Box sx={{ height: '100%'}} style={{'backgroundColor' : 'none'}} display={{ xs: "none", sm: "block" }}>
            <div id="chatting-list"  ref={scrollRef}>
              {chat.map((item, index) => (
                <div className={item.me ? 'my-chat' : 'other-chat'} key={index}>
                  <div className="chat-nickname">{item.nickname}</div>
                  <hr/>
                  <div className="chat-content">{item.content}</div>
                </div>
              ))}
            </div>
            <div className="chatting-input">
              <TextField
                id="standard-multiline-static"
                multiline
                style={{ margin: '0', width: '100%', backGroundColor: "pink" }}
                margin="none"
                rows={2}
                placeholder="메시지 보내기"
                value={inputMessage}
                onChange={onChangeMessage}
                onKeyDown={onPressMessage}
                variant="filled"
              />
              <div className="chatting-bottom">
                <span>{myName}</span>
                <Button variant="contained" onClick={sendMessage}>
                  보내기
                </Button>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openVote} onClose={closeVote} className='mypage-left-item' >
        <div style={{padding: "10px"}}>
          <DialogTitle>투표하기</DialogTitle>
          <SessionVote idx={params.id} closeVote={closeVote}/>
        </div>
      </Dialog>
    </Box>
  );
};

export default ScreenShare;
