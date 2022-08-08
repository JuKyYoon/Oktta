import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { pwInquiryTokenCheckRequest, pwInquiryNewPasswordRequest } from "../../services/userService";
import { Countdown } from 'react-time-sync';
import { Button } from "@mui/material";
import { FormControl, FormHelperText, InputLabel, Input } from "@mui/material";


const PwInquiryNewPassword = () => {
  const navigate = useNavigate('');
  const [timeLimit, setTimeLimit] = useState(0);
  const [resetToken, setResetToken] = useState('');

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  const passwordChange = (event) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    const isPasswordValid = regPassword.test(event.target.value);

    setPassword(event.target.value);
    setIsPasswordValid(isPasswordValid);

    if (event.target.value && isPasswordValid) {
      setIsPasswordSame(
        event.target.value && event.target.value === passwordCheck
      );
    }
  };

  const passwordCheckChange = (event) => {
    setPasswordCheck(event.target.value);
    setIsPasswordSame(password === event.target.value);
  };

  const handleSubmit = () => {
    console.log(resetToken)
    const dataToSubmit = {
      param: resetToken,
      data: password
    };

    const data = pwInquiryNewPasswordRequest(dataToSubmit);
    if (data.message === 'success') {
      alert('비밀번호가 변경되었습니다.')
      navigate('../login')
    } else {
      alert('토큰이 유효하지 않습니다..')
    }
  };

  useEffect(() =>{
    const tokenCheck = async (resetToken) => {
      const data = await pwInquiryTokenCheckRequest(resetToken);
      if (data.message === 'success') {
        setResetToken(resetToken);
        const timeLimit = Date.parse(data.result) + 5 * 60 * 1000;
        setTimeLimit(timeLimit);
      } else {
        alert('토큰이 유효하지 않습니다.')
        navigate('../pwInquiry/emailSend')
      };
    };
    
    const params = new URLSearchParams(location.search);
    const resetToken = params.get('reset-token');
    tokenCheck(resetToken)
    .catch((err) => console.log(err));
  }, []);

  return (
    <div className="form">
      <h2>비밀번호 찾기</h2>
      <div>
        <FormControl>
          <InputLabel htmlFor='password' color='veryperi'>
            새로운 비밀번호
          </InputLabel>
          <Input
            id='password'
            type='password'
            color='veryperi'
            value={password}
            onChange={passwordChange}
          />
          <FormHelperText error={!!password && !isPasswordValid}>
            {isPasswordValid
              ? '안전한 비밀번호입니다.'
              : '영문 + 숫자 조합으로 8자 이상으로 설정해주세요.'}
          </FormHelperText>
        </FormControl>
        <br />
        <br />
        <FormControl>
          <InputLabel htmlFor='passwordCheck' color='veryperi'>
            비밀번호 확인
          </InputLabel>
          <Input
            type='password'
            color='veryperi'
            value={passwordCheck}
            onChange={passwordCheckChange}
          />
          <FormHelperText error={!!passwordCheck && !isPasswordSame}>
            {!passwordCheck || isPasswordSame
              ? ' '
              : '비밀번호가 일치하지 않습니다.'}
          </FormHelperText>
        </FormControl>
        <br />
        { timeLimit ? 
          <Countdown until={ timeLimit }>
            {({ timeLeft }) => (
              <div>{timeLeft > 0 ? `남은시간: ${parseInt(timeLeft / 60)}분 ${timeLeft % 60}초`  : '인증이 만료되었습니다. 다시 인증해주세요.'}</div>
            )}
          </Countdown>
          : <p> </p>
        }
        <br />
        <div>
          <Button
            variant="contained"
            color="veryperi"
            onClick={handleSubmit}
            size="large"
          >
            변경
          </Button>
          <Button
            variant="text"
            color="veryperi"
            onClick={() => navigate('../pwInquiry/emailSend')}
            size="large"
          >
            이메일 재입력
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PwInquiryNewPassword;
