import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { SOCIAL_LOGIN } from '../../modules/types'

const SocialAuth = () => {
  const [param, setParam] = useSearchParams();
  const token = param.get("token")
  const nickname = param.get("nickName")
  const snsType = param.get("snsType")
  const tier = param.get("tier")
  const summonerName = param.get("summonerName")

  const dispatch = useDispatch();
  const user = {
    isLogin: true,
    nickname: nickname,
    auth: "1",
    token: token,
    snsType: snsType,
    tier: tier,
    summonerName: summonerName,
  }
  dispatch({
    type: SOCIAL_LOGIN,
    payload: user,
  });

  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 1);

  return <></>;
}

export default SocialAuth;