import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pagination, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import '../../styles/user.scss';
import { delAccount, getProfileRequest, USER_URL } from '../../services/userService';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import TextField from '@mui/material/TextField';
import { LOGOUT } from '../../modules/types';
import { getMyRoom } from '../../services/roomService';
import { axiosAuth } from '../../services/axios';
// import { getMyBoard } from '../../services/boardService';

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const [password, setPassword] = useState('');
  const [open_delbtn, setOpenDelBtn] = useState(false);
  const [open_profile, setOpenProfile] = useState(false);
  const [mode, setMode] = useState('info');
  const [profile, setProfile] = useState({});
  const [roomList, setRoomList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);

  const pageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getMyRoom()
      .then((res) => setRoomList(res.data.list))
      .catch((err) => console.log(err));

    // getMyBoard()
    //   .then((res) => setBoardList(res.data.list))
    //   .catch((err) => console.log(err));

    getProfileRequest()
      .then((res) => setProfile(res.data?.result))
      .catch((err) => console.log(err))
  }, []);

  const handleClickOpenDelBtn = () => {
    setPassword("");
    setOpenDelBtn(true);
  };
  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  }
  const handleClose = () => {
    setOpenProfile(false);
    setOpenDelBtn(false);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleSetProfile = () => {
    const formData = new FormData();
    formData.append('profileImg', selectedFile);
    axiosAuth.post(`${USER_URL}/profile-img`, formData)
      .then((res) => {
        if (res.data.message === "success") {
          setOpenProfile(false);
          window.location.replace('/user/mypage');
        }
      })
      .catch((err) => console.log(err))
  }

  const deleteUser = () => {
    delAccount({ data: { password } })
      .then((res) => {
        if (res.payload.data.message === "success") {
          navigate('/');
          alert("그동안 OKTTA를 이용해주셔서 감사합니다.");
          dispatch({ type: LOGOUT });
        }
        else {
          alert("비밀번호를 잘못 입력했습니다.");
          handleClose();
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='mypage'>
      <div className='mypage-top'>
        <div className='mypage-left'>
          <div className='mypage-image-profile'>
            <img src={profile.profileImg} width={300} />
          </div>
          <Button onClick={handleClickOpenProfile}>
            <FlipCameraIosIcon />
          </Button>
          <Dialog open={open_profile} onClose={handleClose}>
            <DialogTitle>프로필 이미지 업로드</DialogTitle>
            <DialogContent>
              <div className='new-profile-img'>
                1MB 미만의 파일만 등록할 수 있습니다.(jpg, jpeg, gif, png)
                <br /><br />
                <input
                  type='file'
                  accept='image/*'
                  onChange={e => handleFileInput(e)}
                />
                <br /><br />
                ⚠️미풍양속을 저해하는 저속, 음란한 내용의 그림 등록시
                경고없이 삭제될 수 있습니다.
                <br /><br />
              </div>
              <div className='select-profile-img'>
                <br />
                기본 이미지 선택하기
                <ul>
                  <button className='default-profile' >
                    <img src='../../assets/lol_tiers/iron.png' width={70} />
                  </button>
                  <button className='default-profile' >
                    <img src='../../assets/lol_tiers/bronze.png' width={70} />
                  </button>
                  <button className='default-profile' >
                    <img src='../../assets/lol_tiers/silver.png' width={70} />
                  </button>
                  <button className='default-profile' >
                    <img src='../../assets/lol_tiers/gold.png' width={70} />
                  </button>
                  <button className='default-profile' >
                    <img src='../../assets/lol_tiers/platinum.png' width={70} />
                  </button>
                </ul>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} className="cancel">취소</Button>
              <Button onClick={handleSetProfile}>등록</Button>
            </DialogActions>
          </Dialog>
          <Link to='/user/updateProfile'>회원 정보 수정하기</Link>
        </div>
        <div className='mypage-right'>
          <div>
            <span
              onClick={() => setMode('info')}
              className={`mypage-mode mypage-mode-start ${mode === 'info' ? 'mypage-selected' : null
                }`}>
              내 정보
            </span>
            <span
              onClick={() => setMode('room')}
              className={`mypage-mode ${mode === 'room' ? 'mypage-selected' : null
                }`}>
              작성한 토론(?) 글 목록
            </span>
            <span
              onClick={() => setMode('board')}
              className={`mypage-mode mypage-mode-end ${mode === 'board' ? 'mypage-selected' : null
                }`}>
              작성한 자유게시판 글 목록
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
                  <div>총 <b>{roomList.length}</b>개의 게시물을 작성하였습니다.</div>
                  {roomList.slice((page - 1) * 7, page * 7).map((room, idx) => (
                    <div key={idx} className='mypage-contents-item'>
                      <Link to={`../../room/${room.idx}`}>{room.title}</Link>
                    </div>
                  ))}
                </div>
                <Pagination count={Math.ceil(roomList.length / 7)} page={page} color='veryperi' onChange={pageChange} />
              </>
            )}
            {mode === 'board' && (
              <>
                <div>
                  <div>총 <b>{boardList.length}</b>개의 게시물을 작성하였습니다.</div>
                  {boardList.slice((page - 1) * 7, page * 7).map((board, idx) => (
                    <div key={idx} className='mypage-contents-item'>
                      <Link to={`../../board/${board.idx}`}>{board.title}</Link>
                    </div>
                  ))}
                </div>
                <Pagination count={Math.ceil(boardList.length / 7)} page={page} color='veryperi' onChange={pageChange} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className='mypage-bottom'>
        <div>
          <Button onClick={handleClickOpenDelBtn}>
            회원 탈퇴
          </Button>
          <Dialog open={open_delbtn} onClose={handleClose}>
            <DialogTitle>정말로 탈퇴하시겠습니까? <br /> 탈퇴 이후 정보는 되돌릴 수 없습니다.</DialogTitle>
            {user.snsType === "" ?
              <DialogContent>
                <TextField
                  label="비밀번호를 입력해주세요."
                  type="password"
                  fullWidth
                  variant="standard"
                  value={password}
                  onChange={passwordChange}
                  color='veryperi'
                />
              </DialogContent> :
              <></>
            }
            <DialogActions>
              <Button onClick={handleClose} className="cancel">취소</Button>
              <Button onClick={deleteUser}>탈퇴</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div >
  );
};

export default MyPage;
