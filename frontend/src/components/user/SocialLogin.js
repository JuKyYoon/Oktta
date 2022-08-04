import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AUTH_URL, googleLoginRequest } from '../../services/userService.js';

const SocialLogin = () => {
  const dispatch = useDispatch();
  const handleCallbackResponse = (response) => {
    dispatch(googleLoginRequest())
      .then((res) => {
        if (res.payload.message === 'success') {
          console.log(res.payload.message);
          navigate('/');
        } else {
          console.log(res.payload.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // global google
  const global_google = () => {
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      // callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('googleIdLogin'), {
      // type: "icon",
      theme: 'outline',
      size: 'large',
    });
    // Google One Tap Login
    // 위치 옮기거나 쓰지 않거나
    google.accounts.id.prompt();
  };

  const global_naver = () => {
    const login = new naver.LoginWithNaverId(
      {
        clientId: process.env.REACT_APP_NAVER_CLIENT_ID,
        callbackUrl: process.env.REACT_APP_SERVER_URL + AUTH_URL + "/naver",
        isPopup: true,
        loginButton: { color: "green", type: 3, height: 43 },
      }
    )
    login.init();
  };

  const REST_API_KEY = process.env.REACT_APP_KAKAO_RESTAPI_KEY;
  const REDIRECT_URI = process.env.REACT_APP_SERVER_URL + AUTH_URL + "/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const global_kakao = () => {
    Kakao.Auth.login();
  };

  useEffect(() => {
    // add script
    if (!document.getElementById('google_login')) {
      const script = document.createElement('script');
      script.id = 'google_login';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        global_google();
      };
      document.body.appendChild(script);
    } else {
      global_google();
    }
    document.body.removeChild(document.getElementById('google_login'));

    if (!document.getElementById('naver_login')) {
      const script = document.createElement('script');
      script.id = 'naver_login';
      script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        global_naver();
      };
      document.body.appendChild(script);
    }
    else {
      global_naver();
    }
    document.body.removeChild(document.getElementById('naver_login'));

    if (!document.getElementById('kakao_login')) {
      const script = document.createElement('script');
      script.id = 'kakao_login';
      script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (!Kakao.isInitialized()) {
          Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
        }
      };
      document.body.appendChild(script);
    };
    document.body.removeChild(document.getElementById('kakao_login'));
  }, []);

  return (
    <>
      <div id='googleIdLogin' className='social_login'></div>
      <div id='naverIdLogin' className='social_login'></div>
      <a onClick={global_kakao} id='kakaoIdLogin' className='social_login'>
        <img src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="200" alt="카카오 로그인 버튼" />
      </a>
    </>
  );
};

export default SocialLogin;
