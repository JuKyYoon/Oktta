import { Button, ButtonGroup } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import GoogleLogin from "./GoogleLogin";
import { loginRequest } from "../services/userService.js";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMessage = useRef();

  // 로그인 구현 부분
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      id: email,
      password: password,
    };
    dispatch(loginRequest(body))
      .then((res) => {
        if (res.payload.data.message === "success") {
          navigate('/');
        } else {
          // 에러 메시지 보이기
          errorMessage.current.style.display = 'block'
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form">
      <h2>로그인</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="loginform">
          <TextField id="email" label="이메일" variant="standard" color="veryperi"
            type="email"
            value={email}
            onChange={onEmailHandler} /><br />
          <TextField id="password" label="비밀번호" variant="standard" color="veryperi"
            type="password"
            value={password}
            onChange={onPasswordHandler}
            autoComplete="current-password" />
        </div>
        <div className="error_message" ref={errorMessage}>
          이메일 또는 비밀번호를 잘못 입력했습니다.
          <br />입력하신 내용을 다시 확인해주세요.
        </div>
        <br />
        <Button type="submit" variant="contained" fullWidth>
          로그인
        </Button>
      </form>
      <br />
      {/* 소셜 로그인 */}
      <GoogleLogin />
      <div>
        <Button href="">카카오</Button>
        <Button href="">네이버</Button>
      </div>
      <div>
        <Button><Link to='/user/pwInquiry'>비밀번호 찾기</Link></Button>
        <Button><Link to='/user/signUp'>회원가입</Link></Button>
      </div>
    </div >
  );
}

export default Login;
