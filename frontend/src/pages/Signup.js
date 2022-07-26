import React, { useState } from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Container, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { checkEmailRequest, checkNicknameRequest, signupRequest } from '../services/userService';
import { debounce } from 'lodash';

const debounceFunc = debounce((value, func, save) => {
  save(func(value))
}, 500);

const Signup = () => {
  // 테마색 설정
  const theme = createTheme({
    palette: {
      veryperi: {
        main: '#6667AB',
        contrastText: '#fff',
      },
    },
  });
  
  // input값들 useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  
  // 유효성 확인 결과 변수
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  
  // 이메일, 닉네임 중복체크 useState
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  
  const emailChange = (event) => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const isEmailValid = regEmail.test(event.target.value)

    setEmail(event.target.value);
    setIsEmailValid(isEmailValid)

    if (isEmailValid) {
      debounceFunc(event.target.value, checkEmailRequest, setEmailChecked);
    };
  };

  const passwordChange = (event) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isPasswordValid = regPassword.test(event.target.value)

    setPassword(event.target.value);
    setIsPasswordValid(isPasswordValid)

    if (event.target.value && isPasswordValid) {
      setIsPasswordSame(event.target.value && event.target.value === passwordCheck)
    };
  };

  const passwordCheckChange = (event) => {
    setPasswordCheck(event.target.value);
    setIsPasswordSame(password === event.target.value)
  };

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

  // 회원가입버튼 클릭시 함수
  const handleSubmit = () => {

    if (!isEmailValid) {
      alert('유효하지 않은 이메일입니다.')

    } else if (emailChecked === 'fail') {
      alert('이미 사용중인 이메일입니다.')

    } else if (!isPasswordSame) {
      alert('비밀번호 확인이 일치하지 않습니다..')

    } else if (!isNicknameValid) {
      alert('닉네임에 특수문자를 사용할 수 없습니다..')

    } else if (nicknameChecked === 'fail') {
      alert('이미 사용중인 닉네임입니다.')

    } else {
      signupRequest({
        email,
        password,
        nickname
      })
    };
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <h2>회원가입</h2>
          <div>
            <FormControl>
              <InputLabel htmlFor="email" color="veryperi">이메일</InputLabel>
              <Input id="email" aria-describedby="email-helper-text" color="veryperi" value={email} onChange={emailChange} />
              <FormHelperText id="email-helper-text" error={!!email && !isEmailValid && (emailChecked !== 'success')}>
                {email ? 
                  (isEmailValid ? 
                    (emailChecked ? (emailChecked == 'fail' ? '이미 사용중인 이메일입니다.' : '사용 가능한 이메일입니다.')
                      : '이메일 중복 여부를 확인중입니다.') : '유효하지 않은 이메일입니다.')
                    : '이메일을 입력해 주세요.'}
              </FormHelperText>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl>
              <InputLabel htmlFor="password" color="veryperi">비밀번호</InputLabel>
              <Input id="password" type='password' aria-describedby="password-helper-text" color="veryperi" value={password} onChange={passwordChange} />
              <FormHelperText id="password-helper-text" error={!!password && !isPasswordValid}>
                {isPasswordValid ? '안전한 비밀번호입니다.' : '영문 + 숫자 조합으로 8자 이상으로 설정해주세요.'}
              </FormHelperText>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl>
              <InputLabel htmlFor="passwordCheck" color="veryperi" >비밀번호 확인</InputLabel>
              <Input id="passwordCheck" type='password' aria-describedby="passwordCheck-helper-text" color="veryperi" value={passwordCheck} onChange={passwordCheckChange} />
              <FormHelperText id="passwordCheck-helper-text" error={!!passwordCheck && !isPasswordSame} >
                {(!passwordCheck || isPasswordSame) ? ' ' : '비밀번호가 일치하지 않습니다.'}
              </FormHelperText>
            </FormControl>
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
          <br /><br />
          <div>
            <Button
              variant="contained"
              color="veryperi"
              onClick={handleSubmit}
              disabled={!isEmailValid || !emailChecked || !isPasswordValid || !isPasswordSame || !isNicknameValid || !nicknameChecked}
            >
              회원가입하기
            </Button>
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Signup;