import { Button, ButtonGroup } from "@mui/material";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import GoogleLogin from "./GoogleLogin";
import { loginRequest } from "../services/userService.js";

// 색깔 생성 부분
const theme = createTheme({
  palette: {
    veryperi: {
      main: "#6667AB",
      contrastText: "#fff",
    },
  },
});

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const dispatch = useDispatch();
  // 로그인 구현 부분
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const body = {
      id: email,
      password: password,
    };
    // console.log(dispatch(loginRequest(body)));
    const res = dispatch(loginRequest(body));
    // .then((res) => {
    console.log(res);
    //   if (res.data.statusCode == 200) {
    //     // props.history.push("/");
    //   } else {
    //     alert(res.data.message);
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="form">
        <h2>로그인</h2>
        <form onSubmit={onSubmitHandler}>
          <div style={{ display: "flex", flexDirection: "column", paddingBottom: 20 }}>
            <TextField id="email" label="이메일" variant="standard" color="veryperi"
              type="email"
              value={email}
              onChange={onEmailHandler} style={{ width: 250 }} /><br />
            <TextField id="password" label="비밀번호" variant="standard" color="veryperi"
              type="password"
              value={password}
              onChange={onPasswordHandler}
              autoComplete="current-password" /></div>
          <div className="error_message" style={{ display: "none" }}>
            이메일 또는 비밀번호를 잘못 입력했습니다.
            <br />입력하신 내용을 다시 확인해주세요.
          </div>
          <br />
          <Button type="submit" variant="contained" color="veryperi" fullWidth>
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
        <ButtonGroup variant="text" size="large" color="inherit">
          <Button href="pwInquiry">비밀번호 찾기</Button>
          <Button href="signUp">회원가입</Button>
        </ButtonGroup>
      </div >
    </ThemeProvider>
  );
}

export default Login;
