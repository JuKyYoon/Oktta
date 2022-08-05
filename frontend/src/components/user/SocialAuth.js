import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const SocialAuth = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")
    const nickname = queryParams.get("nickName")

    const user = useSelector((state) => state.user);
    user.isLogin = true;
    user.nickname = nickname;
    user.auth = "1";
    user.token = token;

    const navigate = useNavigate();
    setTimeout(() => {
        navigate("/");
    }, 1);

    return <></>;
}

export default SocialAuth;