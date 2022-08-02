import React, { useState } from 'react';
<<<<<<< HEAD
import { FormControl, InputLabel, Input, FormHelperText, Container, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
=======
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
>>>>>>> dev
import { checkEmailRequest, checkNicknameRequest, signupRequest } from '../services/userService';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const debounceFunc = debounce((promise, save) => {
  promise
    .then((res) => {
      save(res)
    })
}, 500);

const Signup = () => {

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailChange = (event) => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const isEmailValid = regEmail.test(event.target.value)

    setEmail(event.target.value);
    setIsEmailValid(isEmailValid);

    if (isEmailValid) {
      debounceFunc(dispatch(checkEmailRequest(event.target.value))
        .then((res) => {
          return res.payload.data.message
        }), setEmailChecked)
    }
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
        debounceFunc(dispatch(checkNicknameRequest(event.target.value))
          .then((res) => {
            return res.payload.data.message
          }), setNicknameChecked)
      }

    };
  };

  // 회원가입 구현 부분
  const handleSubmit = (event) => {
    const body = {
      id: email,
      password: password,
      nickname: nickname
    };
    dispatch(signupRequest(body))
      .then((res) => {
        if (res.payload.data.message === "success") {
          alert("회원가입을 축하드립니다!")
          navigate('/');
        } else {
          alert("회원가입에 실패하였습니다!")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form">
      <h2>회원가입</h2><br />
      <FormControl>
        <InputLabel htmlFor="email" color="veryperi">이메일</InputLabel>
        <Input id="email" color="veryperi" value={email} onChange={emailChange} />
        <FormHelperText error={!!email && (!isEmailValid || emailChecked === "fail")}>
          {email ?
            (isEmailValid ?
              (emailChecked ? (emailChecked === "fail" ? '이미 사용중인 이메일입니다.' : '사용 가능한 이메일입니다.')
                : '이메일 중복 여부를 확인중입니다.') : '유효하지 않은 이메일입니다.')
            : '이메일을 입력해 주세요.'}
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="password" color="veryperi" >비밀번호</InputLabel>
        <Input id="password" type='password' color="veryperi" value={password} onChange={passwordChange} />
        <FormHelperText error={!!password && !isPasswordValid} >
          {isPasswordValid ? '안전한 비밀번호입니다.' : '영문 + 숫자 조합으로 8자 이상으로 설정해주세요.'}
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <InputLabel htmlFor="passwordCheck" color="veryperi" >비밀번호 확인</InputLabel>
        <Input type='password' color="veryperi" value={passwordCheck} onChange={passwordCheckChange} />
        <FormHelperText error={!!passwordCheck && !isPasswordSame} >
          {(!passwordCheck || isPasswordSame) ? ' ' : '비밀번호가 일치하지 않습니다.'}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="nickname" color="veryperi">닉네임</InputLabel>
        <Input color="veryperi" value={nickname} onChange={nicknameChange} />
        <FormHelperText error={!!nickname && (!isNicknameValid || nicknameChecked === "fail")}>
          {nickname ?
            (isNicknameValid ?
              (nicknameChecked ? (nicknameChecked === 'fail' ? '이미 사용중인 닉네임입니다.' : '사용 가능한 닉네임입니다.')
                : '닉네임 중복 여부를 확인중입니다.')
              : '닉네임에 특수문자를 사용할 수 없습니다.')
            : '특수문자를 제외한 닉네임을 입력해주세요.'}
        </FormHelperText>
      </FormControl>
      <br /><br />
      <Button
        variant="contained"
        color="veryperi"
        onClick={handleSubmit}
        disabled={!isEmailValid || emailChecked === "fail" || !isPasswordValid || !isPasswordSame || !isNicknameValid || nicknameChecked === "fail"}
      >
        가입하기
      </Button>
    </div>
  );
};

export default Signup;