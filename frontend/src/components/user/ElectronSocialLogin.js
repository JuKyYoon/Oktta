import React from 'react';
import "@/styles/Electron.scss"

const ElectronSocialLogin = () => {
  const base_uri = process.env.REACT_APP_SERVER_URL + "/api/v1/oauth2/authorization/"
  const redirect_uri = "?redirect_uri="+ process.env.REACT_APP_CLIENT_URL +"/oauth/redirect";
  const google_uri = base_uri + 'google' + redirect_uri;
  const naver_uri = base_uri + 'naver' + redirect_uri;
  const kakao_uri = base_uri + 'kakao' + redirect_uri;

  return (
    <div className="electron">
      <div>
        <img src="/../assets/logo.png" className="electron-logo-image" />
      </div>
      <div className="electron-social-login-form">  
          <a href={google_uri}>
            <img src='../assets/login_button/google_button.png' className="electron-social-login-button" alt="구글 로그인 버튼" />
          </a>
          <a href={naver_uri}>
            <img src='../assets/login_button/naver_button.png' className="electron-social-login-button" alt="네이버 로그인 버튼" />
          </a>
          <a href={kakao_uri}>
            <img src='../assets/login_button/kakao_button.png' className="electron-social-login-button" alt="카카오 로그인 버튼" />
          </a>
      </div>
    </div>
  );
};

export default ElectronSocialLogin;
