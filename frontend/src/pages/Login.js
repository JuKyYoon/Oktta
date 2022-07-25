import { Button } from "@mui/material";
import { Link } from "@mui/material";
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
    <div className="loginform">
      <form onSubmit={onSubmitHandler}>
        <label>
          이메일
          <br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={onEmailHandler}
          />
        </label>
        <br />
        <label>
          비밀번호
          <br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordHandler}
            autoComplete="current-password"
          />
        </label>
        <br />
        <ThemeProvider theme={theme}>
          <Button type="submit" variant="contained" color="veryperi">
            로그인
          </Button>
        </ThemeProvider>
      </form>
      <br />
      {/* 소셜 로그인 */}
      <div>
        <Link href="#" underline="none">
          네이버
        </Link>
        <Link href="#" underline="none">
          카카오
        </Link>
        <GoogleLogin />
      </div>
      <br />
      <div>
        <Link href="pwInquiry" underline="none">
          비밀번호 찾기
        </Link>
        <Link href="#" underline="none">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Login;
