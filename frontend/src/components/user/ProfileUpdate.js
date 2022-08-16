import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import {
  updateNicknameRequest,
  updatePasswordRequest,
  checkNicknameRequest,
  delAccount,
} from '../../services/userService';
import { debounce } from 'lodash';
import { LOGOUT } from '../../modules/types';

const debounceFunc = debounce(async (value, request, setState) => {
  const result = await request(value)
  if (result?.data?.message) {
    setState(result?.data?.message)
  } else {
    alert('올바르지 않은 접근입니다.')
  };
}, 500);

const ProfileUpdate = () => {

  const [mode, setMode] = useState('nickname');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user)

  // 닉네임 관련
  const currentNickname = user.nickname;
  const snsType = user.snsType;
  const [nickname, setNickname] = useState(currentNickname);
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [banned, setBanned] = useState(false);

  // 비밀번호 관련
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isNewPasswordSame, setIsNewPasswordSame] = useState(false);

  const [password, setPassword] = useState('');
  const [delPassword, setDelPassword] = useState('');

  const [open_delbtn, setOpenDelBtn] = useState(false);

  const passwordChange = (event) => {
    setPassword(event.target.value.trim());
  };

  const delPasswordChange = (event) => {
    setDelPassword(event.target.value.trim());
  };

  const nicknameChange = (event) => {
    setNickname(event.target.value.trim());

    if (event.target.value.trim()) {
      const regNickname = /[^\w\sㄱ-힣]|[\_]/g;
      const isNicknameValid = !regNickname.test(event.target.value.trim());
      setIsNicknameValid(isNicknameValid);

      const banned = event.target.value.trim().includes('deleteuser') || event.target.value.trim() === '알수없음' || event.target.value.trim().length > 10;
      setBanned(banned);

      if (isNicknameValid && !banned) {
        setNicknameChecked(false);
        debounceFunc(
          event.target.value.trim(),
          checkNicknameRequest,
          setNicknameChecked
        );
      }
    }
  };

  const newPasswordChange = (event) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/;
    const isNewPasswordValid = regPassword.test(event.target.value.trim());

    setNewPassword(event.target.value.trim());
    setIsNewPasswordValid(isNewPasswordValid);

    if (event.target.value.trim() && isNewPasswordValid) {
      setIsNewPasswordSame(
        event.target.value.trim() && event.target.value.trim() === newPasswordCheck
      );
    }
  };

  const newPasswordCheckChange = (event) => {
    setNewPasswordCheck(event.target.value.trim());
    setIsNewPasswordSame(newPassword === event.target.value.trim());
  };

  const handleSubmit = async () => {
    switch (mode) {
      case 'nickname':
        if (nicknameChecked === 'fail') {
          alert('이미 사용중인 닉네임입니다.');
        } else {
          const result = await updateNicknameRequest({
            nickname,
            password,
          })
          if (result?.payload?.data?.message === 'success') {
            dispatch(result);
            alert('닉네임이 변경되었습니다.');
            navigate('/user/mypage');
          } else if (result?.payload?.data?.message === 'fail') {
            alert('비밀번호를 확인해주세요.');
            setPassword('');
          } else {
            alert('잘못된 접근입니다.')
          };
        };
        break;
      case 'password':
        if (!isNewPasswordValid) {
          alert('안전하지 않은 비밀번호입니다.');
        } else if (!isNewPasswordSame) {
          alert('비밀번호 확인이 일치하지 않습니다.');
        } else {
          const result = await updatePasswordRequest({
            newPassword,
            oldPassword: password,
          })
          if (result?.data?.message === 'success') {
            alert('비밀번호가 변경되었습니다.');
            navigate('/user/mypage');
          } else if (result?.data?.message === 'fail') {
            alert('비밀번호를 확인해주세요.');
            setPassword('');
            setNewPassword('');
            setNewPasswordCheck('');
          } else {
            alert('잘못된 접근입니다.')
          };
        };
        break;
      default:
        alert('올바르지 않은 접근입니다.');
    }
  };

  const handleClickOpenDelBtn = () => {
    setPassword("");
    setOpenDelBtn(true);
  };

  const handleClose = () => {
    setOpenDelBtn(false);
  };

  const deleteUser = async () => {
    const result = await delAccount({ data: { 'password': delPassword } });
    if (result?.data?.message === "success") {
      navigate('/');
      alert("그동안 OKTTA를 이용해주셔서 감사합니다.");
      dispatch({ type: LOGOUT });
    }
    else {
      alert("비밀번호를 잘못 입력했습니다.");
      setDelPassword('');
      handleClose();
    };
  };

  return (
    <div className="main-content">
      <div className='user-edit-form'>
        <h2>회원정보 수정</h2>
        <div className='update-menu'>
          <div onClick={() => setMode('nickname')} className={`update-menu-item ${mode === 'nickname' ? 'menu-selected' : null}`}>
            닉네임 변경
          </div>
          {snsType ?
            null :
            <div onClick={() => setMode('password')} className={`update-menu-item ${mode === 'password' ? 'menu-selected' : null}`}>
              비밀번호 변경
            </div>
          }
        </div>
        <br />
        <br />
        {snsType ?
          null :
          <div>
            <FormControl className="update-profile-form">
              <InputLabel htmlFor='password' color='veryperi'>
                기존 비밀번호
              </InputLabel>
              <Input
                id='password'
                type='password'
                aria-describedby='password-helper-text'
                color='veryperi'
                value={password}
                onChange={passwordChange}
              />
              <FormHelperText id='password-helper-text'>
                비밀번호를 입력해주세요.
              </FormHelperText>
            </FormControl>
            <br />
            <br />
          </div>
        }
        {mode === 'nickname' ? (
          <div>
            <br />
            <div>
              <FormControl className="update-profile-form">
                <InputLabel htmlFor='nickname' color='veryperi'>
                  닉네임
                </InputLabel>
                <Input
                  id='nickname'
                  aria-describedby='nickNm-helper-text'
                  color='veryperi'
                  value={nickname}
                  onChange={nicknameChange}
                />
                <FormHelperText
                  id='nickname-helper-text'
                  error={
                    !!nickname &&
                    (!isNicknameValid || nicknameChecked === 'fail' || banned)
                  }>
                  {nickname
                    ? nickname === currentNickname
                      ? '새로운 닉네임을 입력해주세요.'
                      : isNicknameValid
                        ? !banned
                          ? nicknameChecked
                            ? nicknameChecked == 'success'
                              ? '사용 가능한 닉네임입니다.'
                              : '이미 사용중인 닉네임입니다.'
                            : '닉네임 중복 여부를 확인중입니다.'
                          : '사용할 수 없는 닉네임입니다.'
                        : '닉네임에 특수문자를 사용할 수 없습니다.'
                    : '10글자 이하의 닉네임을 입력해주세요.'}
                </FormHelperText>
              </FormControl>
            </div>
            <br />
          </div>
        ) : (
          <div>
            <div>
              <FormControl className="update-profile-form">
                <InputLabel htmlFor='new-password' color='veryperi'>
                  새 비밀번호
                </InputLabel>
                <Input
                  id='new-password'
                  type='password'
                  aria-describedby='password-helper-text'
                  color='veryperi'
                  value={newPassword}
                  onChange={newPasswordChange}
                />
                <FormHelperText
                  id='password-helper-text'
                  error={!!newPassword && !isNewPasswordValid}>
                  {isNewPasswordValid
                    ? '안전한 비밀번호입니다.'
                    : '영문 + 숫자 조합으로 8~16자로 설정해주세요.'}
                </FormHelperText>
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl className="update-profile-form">
                <InputLabel htmlFor='passwordCheck' color='veryperi'>
                  비밀번호 확인
                </InputLabel>
                <Input
                  id='passwordCheck'
                  type='password'
                  aria-describedby='passwordCheck-helper-text'
                  color='veryperi'
                  value={newPasswordCheck}
                  onChange={newPasswordCheckChange}
                />
                <FormHelperText
                  id='passwordCheck-helper-text'
                  error={!!newPasswordCheck && !isNewPasswordSame}>
                  {!newPasswordCheck || isNewPasswordSame
                    ? ' '
                    : '비밀번호가 일치하지 않습니다.'}
                </FormHelperText>
              </FormControl>
            </div>
          </div>
        )}
        <br />
        <br />
        <div>
          <Button
            variant='contained'
            color='veryperi'
            onClick={handleSubmit}
            disabled={
              (mode === 'nickname' &&
                (nicknameChecked !== 'success' || banned || !nickname)) ||
              (mode === 'password' &&
                (!password || !isNewPasswordSame || !isNewPasswordValid))
            }>
            저장
          </Button>
          <Link to='/user/myPage'>
            <Button variant='outlined' color='veryperi'>
              취소
            </Button>
          </Link>
        </div>
        <br /><br /><br /><br />
        <div>
          <Button onClick={handleClickOpenDelBtn} id='delete-btn'>
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
                  value={delPassword}
                  onChange={delPasswordChange}
                  color='veryperi'
                />
              </DialogContent> :
              <></>
            }
            <DialogActions>
              <Button onClick={handleClose} sx={{ color: 'black' }}>취소</Button>
              <Button onClick={deleteUser}>탈퇴</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
