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
        <img src='https://user-images.githubusercontent.com/79758079/183028817-370ac9e8-8b80-498b-b475-b06e923063ed.png' className='social_login' id='googleIdLogin' alt="구글 로그인 버튼" />
      </a>
      <a href={naver_uri}>
        <img src="https://user-images.githubusercontent.com/79758079/183029121-29c9cab8-2ca5-49bb-808a-f766118420f1.png" className='social_login' id='naverIdLogin' alt="네이버 로그인 버튼" />
      </a>
      <a href={kakao_uri}>
        <img src="https://user-images.githubusercontent.com/79758079/183028387-0174973f-8105-42c0-bdbe-db329ea4c5e7.png" className='social_login' id='kakaoIdLogin' alt="카카오 로그인 버튼" />
      </a>
    </>
  );
};

export default SocialLogin;
