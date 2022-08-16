import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocialLogin from "./SocialLogin";
import { loginRequest } from "../../services/userService.js";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useSelector((state) => state.user.isLogin);


  const onEmailHandler = (event) => {
    setEmail(event.target.value.trim());
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value.trim());
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMessage = useRef();

  // 로그인 구현 부분
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const body = {
      id: email,
      password: password,
    };
    const result = await loginRequest(body);
      if (result?.payload?.data?.message === 'success') {
        dispatch(result);
        navigate("/");
      } else if (result?.payload?.data?.message === 'fail') {
        // 에러 메시지 보이기
        errorMessage.current.style.display = 'block';
      } else {
        navigate("/error");
      }
  };

  useEffect(() => {
    if (login) {
      navigate('/');
    }
  }, []);


  return (
    <div className="login">
      <div className="login-form">
        <h2>로그인</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="input-form">
            <TextField
              id="email"
              label="이메일"
              variant="standard"
              color="veryperi"
              type="email"
              value={email}
              onChange={onEmailHandler}
            />
            <br />
            <TextField
              id="password"
              label="비밀번호"
              variant="standard"
              color="veryperi"
              type="password"
              value={password}
              onChange={onPasswordHandler}
              autoComplete="current-password"
            />
          </div>
          <div className="error_message" ref={errorMessage}>
            이메일 또는 비밀번호를 잘못 입력했습니다.
            <br />
            입력하신 내용을 다시 확인해주세요.
          </div>
          <br />
            <Button type = "submit" color="veryperi" variant="contained" fullWidth>
              로그인
            </Button>
        </form>
        <br />
        <div>
          <Button>
            <Link to="/user/pwInquiry">비밀번호 찾기</Link>
          </Button>
          <Button>
            <Link to="/user/signUp">회원가입</Link>
          </Button>
        </div>
        <br />
        <div className="login_or">
          <span className="login_text">또는</span>
        </div>
        <SocialLogin />
        </div>
      </div>
  );
};

export default Login;
