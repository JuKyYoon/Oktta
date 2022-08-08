import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

const SocialAuth = () => {
  const [param, setParam] = useSearchParams();
  const token = param.get("token")
  const nickname = param.get("nickName")
  const snsType = param.get("snsType")

  const user = useSelector((state) => state.user);
  user.isLogin = true;
  user.nickname = nickname;
  user.auth = "1";
  user.token = token;
  user.snsType = snsType;

  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 1);

  return <></>;
}

export default SocialAuth;