import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { emailAuth, logoutRequest } from "../../services/userService";

const EmailAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.pathname.split("/").pop();

  useEffect(() => {
    emailAuth(token)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    dispatch(logoutRequest())
      .then((res) => {})
      .catch((err) => console.log(err));
    navigate("/");
  });

  return (
    <>
      <div>토큰이 만료되었습니다.</div>
      <div>인증이 완료되었습니다.</div>
    </>
  );
};

export default EmailAuth;
