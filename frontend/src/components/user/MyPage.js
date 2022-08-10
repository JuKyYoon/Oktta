import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pagination, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import '../../styles/user.scss';
import { delAccount, getProfileRequest } from '../../services/userService';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { LOGOUT } from '../../modules/types';
import { getMyRoom } from '../../services/roomService';
// import { getMyBoard } from '../../services/boardService';

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('info');
  const [profile, setProfile] = useState({});
  const [roomList, setRoomList] = useState([]);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);

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

  const handleClickOpen = () => {
    setPassword("");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

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
            <img className='mypage-image-tier' src='../../assets/gunan.png' width={300} />
          </div>
          <Link to='/user/updateProfile'>프로필 사진 변경하기 <EditIcon fontSize='inherit' /></Link>
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
                <img className='mypage-image-tier' src='../../assets/lol_tiers/challenger.png' width={200} />
                {/* 둘 중 하나만 뜨도록 하기 */}
                <Button>티어 인증하기</Button>
                <h1 className='mypage-summoner'>소환사명</h1>
              </>
            )}
            {mode === 'room' && (
              <>
                <div>
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
          <Button onClick={handleClickOpen}>
            회원 탈퇴
          </Button>
          <Dialog open={open} onClose={handleClose}>
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
