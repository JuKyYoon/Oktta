import { Button } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { emailAuth } from "../../services/userService";
import { EMAIL_AUTH }  from "@/modules/types.js";

const EmailAuth = () => {
  const [msg, setMsg] = useState("");
  const [time, setTime] = useState(5);
  const timeRef = useRef(5);
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.user.isLogin);

  const { token } = useParams();

  const authEmail = async () => {
    const result = await emailAuth(token);
    if(result?.data?.message === "success") {
      setMsg("success");
      dispatch({
        type: EMAIL_AUTH,
      });

      timerRef.current = setInterval(() => {
        console.log("down")
        timeRef.current-=1;
        setTime(timeRef.current);
    
        if(timeRef.current === 0) {
          clearInterval(timerRef.current);
          if(login) {
            navigate("/");
          } else {
            navigate("/user/login");
          }
        }
      }, 1000);

    } else {
      console.log(result);
    }
  }

  useEffect(() => {
    authEmail();

    return () => {
      clearInterval(timerRef.current);
      console.log("unmount")
    }
  }, []);

  return (
    <div className="email-auth">
      {msg === "success" ? login ?
        <h1>
          {time}초 후 메인 페이지로 이동합니다. <br />
          인증이 완료되었습니다. <br />
          <div className="email-auth-button">
            <Link to='/'>
                <Button color="veryperi" variant="contained" sx={{paddingLeft: 2, paddingRight: 2}}>홈으로</Button>
            </Link>
          </div>
        </h1> :
          <h1>
          {time}초 후 로그인 페이지로 이동합니다. <br />
          인증이 완료되었습니다. <br />
          <div className="email-auth-button">
            <Link to='/user/login'>
              <Button color="veryperi" variant="contained" sx={{paddingLeft: 2, paddingRight: 2}}>
                로그인하기
              </Button>
            </Link>
          </div>
        </h1> :
        <h1>잘못된 인증 요청입니다. <br />
          다시 이메일 인증을 요청하세요. <br />
          <div className="email-auth-button">
            <Link to='/'>
              <Button color="veryperi" variant="contained" sx={{paddingLeft: 2, paddingRight: 2}}>홈으로</Button>
            </Link>
          </div>
                
        </h1>
      }
    </div>
  );
};

export default EmailAuth;