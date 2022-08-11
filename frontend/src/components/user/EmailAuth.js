import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { emailAuth, logoutRequest } from "../../services/userService";
import Home from "../Home";

const EmailAuth = () => {
  const [msg, setMsg] = useState("");
  const [time, setTime] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const token = location.pathname.split("/").pop();

  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  })

  useEffect(() => {
    emailAuth(token)
      .then((res) => {
        setMsg(res.payload.data.message);
      })
      .catch((err) => console.log(err));
    if (user.isLogin) {
      dispatch(logoutRequest())
        .catch((err) => { console.log(err) })
    }
    setTimeout(() => {
      navigate("/user/login");
    }, 5000);
  }, []);

  return (
    <>
      {!!msg ?
        <>
          {msg === "success" ?
            <h1>
              {time}초 후 메인 페이지로 이동합니다. <br />
              인증이 완료되었습니다. <br />
              <Button><a href='/user/login'>로그인하기</a></Button>
            </h1> :
            <h1>잘못된 인증 요청입니다. <br />
              다시 이메일 인증을 요청하세요. <br />
              <Button><a href='/'>홈으로</a></Button>
            </h1>
          }
        </> : <></>
      }
    </>
  );

};

export default EmailAuth;
