import React from 'react'
import "@/styles/tierAuth.scss"
import { Button } from '@mui/material';

const TierAuth = () => {
  return (
    <div className='tier-auth-page'>
      <h1 className='tier-auth-title'>롤 티어 인증하는 방법</h1><br/>
      <h3 className='tier-auth-content'>STEP 1. 롤 티어 인증 프로그램을 다운 받습니다.</h3>
      <a href="https://oktta.s3.us-east-2.amazonaws.com/oktta+Setup+0.0.1.exe" download="oktta.exe">
        <Button size='large'>티어 인증 프로그램 다운</Button>
      </a><br/><br/>
      <h3 className='tier-auth-content'>STEP 2. OKTTA 홈페이지에서 가입한 아이디로 로그인 해주세요.</h3>
      <img src='../assets/tier_auths/Step1.png' className='tier-auth-steps' alt='1단계 사진'/><br/><br/>
      <h3 className='tier-auth-content'>STEP 3. 롤을 실행시킨 후 티어 인증하기 버튼을 클릭 해주세요.</h3>
      <img src='../assets/tier_auths/Step2.png' className='tier-auth-steps' alt='2단계 사진'/><br/><br/>
      <h3 className='tier-auth-content'>주의 : 롤을 실행시키지 않으면 다음과 같은 화면이 뜹니다.</h3>
      <img src='../assets/tier_auths/Step3.png' className='tier-auth-steps' alt='3단계 사진'/><br/><br/>
      <h3 className='tier-auth-content'>STEP 4. 롤 티어 인증 실패 시 다음과 같이 뜨게 됩니다.</h3>
      <img src='../assets/tier_auths/Step4.png' className='tier-auth-steps' alt='4단계 사진'/>
      {/* 성공 이미지
      <h3 className='tier-auth-content'>STEP 5. 롤 티어 인증 성공 시 다음과 같이 뜨게 됩니다.</h3>
      <img src='../assets/tier_auths/Step5.png' className='tier-auth-steps' alt='5단계 사진'/> */}
    </div>
  )
}

export default TierAuth;
