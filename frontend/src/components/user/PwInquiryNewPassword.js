import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { pwInquiryTokenCheckRequest, pwInquiryNewPasswordRequest } from "../../services/userService";
import { Countdown } from 'react-time-sync';
import { Button } from "@mui/material";
import { FormControl, FormHelperText, InputLabel, Input } from "@mui/material";


const PwInquiryNewPassword = () => {
  const navigate = useNavigate('');
  const { token } = useParams();
  const [timeLimit, setTimeLimit] = useState(0);

  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(false);

  const passwordChange = (event) => {
    const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,16}$/;
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

  const handleSubmit = async () => {
    const dataToSubmit = {
      param: token,
      body: {
        data: { "password": password }
      }
    };

    const result = await pwInquiryNewPasswordRequest(dataToSubmit);
    if (result?.data?.message === 'success') {
      alert('비밀번호가 변경되었습니다.');
      navigate('../login');
    } else if (result?.data?.message === 'fail') {
      alert('인증 제한시간이 초과되었습니다. 메일을 다시 전송해 주세요.');
      navigate('../pwInquiry');
    } else {
      alert('올바르지 않은 접근입니다. 다시 시도해주세요.');
    }
  };

  const getTokenCheck = async (token) => {
    const result = await pwInquiryTokenCheckRequest(token);
    if (result?.data?.message === 'success') {
      const timeLimit = Date.parse(result.data.result);
      setTimeLimit(timeLimit);
    } else if (result?.data?.message === 'fail') {
      alert('인증 제한시간이 초과되었습니다. 메일을 다시 전송해 주세요.')
      navigate('../pwInquiry')
    } else {
      alert('올바르지 않은 접근입니다. 다시 시도해주세요.');
    };
  };

  useEffect(() => {
    getTokenCheck(token);
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
              : '영문 + 숫자 조합으로 8~16자로 설정해주세요.'}
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
        {timeLimit ?
          <Countdown until={timeLimit}>
            {({ timeLeft }) => (
              <div>{timeLeft > 0 ? `남은시간: ${parseInt(timeLeft / 60)}분 ${timeLeft % 60}초` : '인증이 만료되었습니다. 다시 인증해주세요.'}</div>
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
            onClick={() => navigate('../pwInquiry')}
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
