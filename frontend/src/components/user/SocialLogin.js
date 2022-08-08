import React from 'react';
const SocialLogin = () => {
  const base_uri = "http://localhost:8080/api/v1/oauth2/authorization/"
  const redirect_uri = "?redirect_uri=http://localhost:3000/oauth/redirect";
  const google_uri = base_uri + 'google' + redirect_uri;
  const naver_uri = base_uri + 'naver' + redirect_uri;
  const kakao_uri = base_uri + 'kakao' + redirect_uri;

  return (
    <>
      <a href={google_uri}>
        <img src='../assets/google_button.png' className='social_login' id='googleIdLogin' alt="구글 로그인 버튼" />
      </a>
      <a href={naver_uri}>
        <img src='../assets/naver_button.png' className='social_login' id='naverIdLogin' alt="네이버 로그인 버튼" />
      </a>
      <a href={kakao_uri}>
        <img src='../assets/kakao_button.png' className='social_login' id='kakaoIdLogin' alt="카카오 로그인 버튼" />
      </a>
    </>
  );
};

export default SocialLogin;
