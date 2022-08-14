import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pagination, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import '../../styles/user.scss';
import { getProfileRequest, setDefaultImg, setProfileImg } from '../../services/userService';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { getMyRoom } from '../../services/roomService';
import Loading from '../layout/Loading';
// import { getMyBoard } from '../../services/boardService';

const MyPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const [open_profile, setOpenProfile] = useState(false);
  const [mode, setMode] = useState('info');
  const [profile, setProfile] = useState({});
  const [roomList, setRoomList] = useState(false);
  const [boardList, setBoardList] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const pageChange = (event, value) => {
    setPage(value);
  };

  const getMyPage = async () => {
    const result2 = await getProfileRequest();
    if (result2?.data?.message === "success") {
      setProfile(result2?.data?.result)
    } else {
      console.log("프로파일 불러오기 실패");
    };
  }

  useEffect(() => {
    getMyPage();
  }, []);

  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  }

  const handleClose = () => {
    setOpenProfile(false);
  };

  const reload = async () => {
    // 이미지 저장 후 리로드
    const result = await getProfileRequest();
    if (result?.data?.message === "success") {
      setProfile(result.data.result)
    } else {
      navigate('/error')
    };
  }

  const handleDefaultImg = async () => {
    const result = await setDefaultImg();
    if (result?.data?.message === "success") {
      setOpenProfile(false);
      reload();
    } else {
      navigate('/error');
    };
  }
  const [pending, setPending] = useState(false);
  const handleSetProfile = async () => {
    if (!selectedFile || selectedFile === 'default') {
      setOpenProfile(false);
      handleDefaultImg();
    }
    else if (selectedFile === 'now') {
      setOpenProfile(false);
    }
    else {
      const formData = new FormData();
      formData.append('profileImg', selectedFile);
      setPending(true);
      const result = await setProfileImg(formData);
      if (result?.data?.message === 'success') {
        reload();
        setOpenProfile(false);
      } else if (result?.response?.data?.message === 'fail') {
        alert('잘못된 파일 형식입니다.');
        setOpenProfile(false);
      } else {
        navigate('/error');
      };
      setPending(false);
    };
  }

  const profileSelect = useRef();
  const profileShow = useRef();

  const fileUpload = () => {
    profileSelect.current.onClick = handleFileInput();
    profileSelect.current.click();
  }

  const handleFileInput = (event) => {
    if (!uploadOpen) {
      setUploadOpen(true);
    }
    else {
      const file = event?.target?.files[0];
      if (file) {
        profileShow.current.src = URL.createObjectURL(file);
        setSelectedFile(file);
      }
      setUploadOpen(false);
    }
  };

  const defaultProfile = () => {
    profileShow.current.src = 'https://oktta.s3.us-east-2.amazonaws.com/defaultProfile.png';
    setSelectedFile('default');
  }

  const ProfileNow = () => {
    profileShow.current.src = profile.profileImg;
    setSelectedFile('now');
  }

  const roomClick = async () => {
    if (roomList === false) {
      const result = await getMyRoom();
      if (result?.data?.message === "success") {
        setRoomList(result?.data?.list);
      } else {
        console.log("불러오기 실패")
      };
    }
    setMode('room');
  }

  const boardClick = async () => {
    if (boardList === false) {
      // const result3 = await getMyBoard();
      // if(result3?.data?.message === "success") {
      //   setBoardList(result3?.data?.list)
      // } else {
      //   console.log("게시물 불러오기 실패");
      // };
    }
    setMode('board');
  }

  return (
    <div className='mypage'>
      {user.auth === "0" ? null :
        <>
          <div className='mypage-top'>
            <div className='mypage-left'>
              <div id='mypage-image-profile' className='mypage-left-item'>
                <img src={profile.profileImg} width={250} />
              </div>
              <Button onClick={handleClickOpenProfile} className='mypage-left-item'>
                <FlipCameraIosIcon fontSize='large' />
              </Button>
              <Dialog open={open_profile} onClose={handleClose} className='mypage-left-item'>
                <div className={`${pending ? 'profile-modal' : null}`}>
                  <DialogTitle>프로필 이미지 업로드</DialogTitle>
                  <DialogContent>
                    1MB 미만의 파일만 등록할 수 있습니다. (jpg, jpeg, gif, png)
                    <br /><br />
                    <p>프로필 이미지 업로드 (선택)</p>
                    <div className="signup-profile">
                      <div className="profile-left">
                        <Button onClick={ProfileNow}>현재 이미지</Button>
                        <Button onClick={fileUpload}>이미지 업로드</Button>
                        <Button onClick={defaultProfile}>기본 이미지</Button>
                      </div>
                      {pending ? <Loading /> : null}
                      <input
                        type='file'
                        accept='image/*'
                        onChange={event => handleFileInput(event)}
                        style={{ display: 'none' }}
                        id='profileUploadBtn'
                        ref={profileSelect}
                      />
                      <br />
                      <img src={profile.profileImg} alt="profile-image" ref={profileShow} style={{ width: 100, alignSelf: 'center' }} />
                      <br /><br />
                      ※미풍양속을 저해하는 저속, 음란한 내용의 그림 등록시
                      경고없이 삭제될 수 있습니다.
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} className="cancel">취소</Button>
                    <Button onClick={handleSetProfile}>등록</Button>
                  </DialogActions>
                </div>
              </Dialog>
              <Link to='/user/updateProfile' className='mypage-left-item'>회원 정보 수정하기</Link>
            </div>
            <div className='mypage-right'>
              <div className='mypage-right-menu'>
                <span
                  onClick={() => setMode('info')}
                  className={`mypage-mode mypage-mode-start ${mode === 'info' ? 'mypage-selected' : null
                    }`}>
                  내 정보
                </span>
                <span
                  onClick={roomClick}
                  className={`mypage-mode ${mode === 'room' ? 'mypage-selected' : null
                    }`}>
                  옥상에서 한판 한 목록
                </span>
                <span
                  onClick={boardClick}
                  className={`mypage-mode mypage-mode-end ${mode === 'board' ? 'mypage-selected' : null
                    }`}>
                  작성한 글 목록
                </span>
              </div>
              <div className={mode === 'info' ? 'mypage-lol-info' : 'mypage-contents-box'}>
                {mode === 'info' && (
                  <>
                    <img className='mypage-image-tier' src='../../assets/lol_tiers/unranked.png' width={200} />
                    {/* 둘 중 하나만 뜨도록 하기 */}
                    <Button>티어 인증하기</Button>
                    <h1 className='mypage-summoner'>소환사명</h1>
                  </>
                )}
                {mode === 'room' && (
                  <>
                    <div>
                      총 <b>{roomList.length}</b>개의 게시물을 작성하였습니다.</div>
                    {roomList.slice((page - 1) * 7, page * 7).map((room, idx) => (
                      <div key={idx} className='mypage-contents-item'>
                        <Link to={`../../room/${room.idx}`}>{room.title}</Link>
                      </div>
                    ))}
                    <Pagination count={Math.ceil(roomList.length / 7)} page={page}
                      color='veryperi' className={`${roomList.length === 0 ? 'no-pagination' : null}`} onChange={pageChange} />
                  </>
                )}
                {mode === 'board' && (
                  <>
                    <div>
                      총 <b>{boardList.length}</b>개의 게시물을 작성하였습니다.</div>
                    {boardList.slice((page - 1) * 7, page * 7).map((board, idx) => (
                      <div key={idx} className='mypage-contents-item'>
                        <Link to={`../../board/${board.idx}`}>{board.title}</Link>
                      </div>
                    ))}
                    <Pagination count={Math.ceil(boardList.length / 7)} page={page}
                      color='veryperi' className={`${boardList.length === 0 ? 'no-pagination' : null}`} onChange={pageChange} />
                  </>
                )}
              </div>
            </div>
          </div >
        </>}
    </div >
  );
};

export default MyPage;
