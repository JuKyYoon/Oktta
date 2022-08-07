import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { emailAuth, logoutRequest } from "../../services/userService";

const EmailAuth = () => {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.pathname.split("/").pop();

  useEffect(() => {
    emailAuth(token)
      .then((res) => {
        setMsg(res.payload.data.message);
      })
      .catch((err) => console.log(err));
    dispatch(logoutRequest())
      .catch((err) => { console.log(err) })
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <>
      {!!msg ?
        <>
          {msg === "success" ? <h1>인증이 완료되었습니다.</h1> : <h1>토큰이 만료되었습니다.</h1>}
        </> : <></>
      }
    </>
  );

};

export default EmailAuth;
