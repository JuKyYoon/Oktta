import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { updateProfileRequest, checkNicknameRequest } from '../services/userService';
import { debounce } from 'lodash';

const debounceFunc = debounce((value, func, save) => {
  save(func(value))
}, 500);

const UpdateProfile = () => {
  // 테마색 설정
  const theme = createTheme({
    palette: {
      veryperi: {
        main: '#6667AB',
        contrastText: '#fff',
      },
    },
  });

  // 닉네임 관련
  const [nickname, setNickname] = useState('test');
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  const [nicknameChecked, setNicknameChecked] = useState(true);

  // 비밀번호 관련
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isNewPasswordSame, setIsNewPasswordSame] = useState(false);

  const nicknameChange = (event) => {
    setNickname(event.target.value);

    if (event.target.value) {
      const regNickname = /[^\w\sㄱ-힣]|[\_]/g;
      const isNicknameValid = !regNickname.test(event.target.value)
      setIsNicknameValid(isNicknameValid)

      if (isNicknameValid) {
        debounceFunc(event.target.value, checkNicknameRequest, setNicknameChecked);
      };
    };
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const newPasswordChange = (event) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isNewPasswordValid = regPassword.test(event.target.value)

    setNewPassword(event.target.value);
    setIsNewPasswordValid(isNewPasswordValid)

    if (event.target.value && isNewPasswordValid) {
      setIsNewPasswordSame(event.target.value && event.target.value === newPasswordCheck)
    };
  };
  
  const newPasswordCheckChange = (event) => {
    setNewPasswordCheck(event.target.value);
    setIsNewPasswordSame(newPassword === event.target.value)
  };

  const handleSubmit = () => {

    if (nicknameChecked === 'fail') {
      alert('이미 사용중인 닉네임입니다.')
    } else {
      updateProfileRequest({
        nickname
      })
    };
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <h2>회원정보 수정</h2>
          <br />
          <FormControl>
            <InputLabel htmlFor="password" color="veryperi">현재 비밀번호</InputLabel>
            <Input id="password" type='password' aria-describedby="password-helper-text" color="veryperi" value={password} onChange={passwordChange} />
            <FormHelperText id="password-helper-text">
              비밀번호를 입력해주세요.
            </FormHelperText>
          </FormControl>
          <br />
          <br />  
          {isPasswordChange ?
            <div>
              <div>
                <Button variant="contained" component="label">
                  프로필 사진 변경
                  <input
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                  />
                </Button>
              </div>
              <br />
              <div>
                <FormControl>
                  <InputLabel htmlFor="nickname" color="veryperi">닉네임</InputLabel>
                  <Input id="nickname" aria-describedby="nickNm-helper-text" color="veryperi" value={nickname} onChange={nicknameChange} />
                  <FormHelperText id="nickname-helper-text" error={!!nickname && !isNicknameValid && !nicknameChecked}>
                    {nickname ?
                      (isNicknameValid ?
                        (nicknameChecked ? (nicknameChecked == 'fail' ? '이미 사용중인 닉네임입니다.' : '사용 가능한 닉네임입니다.')
                          : '닉네임 중복 여부를 확인중입니다.')
                        : '닉네임에 특수문자를 사용할 수 없습니다.')
                      : '특수문자를 제외한 닉네임을 입력해주세요.'}
                  </FormHelperText>
                </FormControl>
              </div>
              <br />
              <Button variant="outline" onClick={() => setIsPasswordChange(!isPasswordChange)}>
                비밀번호 변경하기
              </Button>
            </div> :
            <div>
              <div>
                <FormControl>
                  <InputLabel htmlFor="new-password" color="veryperi">새 비밀번호</InputLabel>
                  <Input id="new-password" type='password' aria-describedby="password-helper-text" color="veryperi" value={newPassword} onChange={newPasswordChange} />
                  <FormHelperText id="password-helper-text" error={!!newPassword && !isNewPasswordValid}>
                    {isNewPasswordValid ? '안전한 비밀번호입니다.' : '영문 + 숫자 조합으로 8자 이상으로 설정해주세요.'}
                  </FormHelperText>
                </FormControl>
              </div>
              <br />
              <div>
                <FormControl>
                  <InputLabel htmlFor="passwordCheck" color="veryperi" >비밀번호 확인</InputLabel>
                  <Input id="passwordCheck" type='password' aria-describedby="passwordCheck-helper-text" color="veryperi" value={newPasswordCheck} onChange={newPasswordCheckChange} />
                  <FormHelperText id="passwordCheck-helper-text" error={!!newPasswordCheck && !isNewPasswordSame} >
                    {(!newPasswordCheck || isNewPasswordSame) ? ' ' : '비밀번호가 일치하지 않습니다.'}
                  </FormHelperText>
                </FormControl>
              </div>
              <Button variant="contained" onClick={() => setIsPasswordChange(!isPasswordChange)}>
                뒤로가기
              </Button>
            </div>
          }
          <br />
          <br />
          <div>
            <Button
              variant="contained"
              color="veryperi"
              onClick={handleSubmit}
              disabled={!isNicknameValid || !nicknameChecked}
            >
              저장
            </Button>
            <Link to="/user/myPage">
              <Button variant="outlined" color="veryperi">취소</Button>
            </Link>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default UpdateProfile;