import React from 'react';
import { Link } from 'react-router-dom';

const SummonerInfo = () => {
  // 유저 정보 store에서 가져오기
  const summoner = false;

  if (summoner) {
    return (
      <div>
        <p>티어</p>
        <p>소환사명</p>
        <p>닉네임</p>
      </div>
    );
  } else {
    // 티어 인증 페이지로 링크 연결
    return (
      <div>
        <Link to="/">티어 인증</Link>
        <p>닉네임</p>
      </div>
    );
  };
};
  
  const Nav = () => {
    // store 연결해서 가져오기
    const isLoggedIn = false;
    
    const logout = () => {
      // store에서 정의
    };

  // 로고 파일 교체 필요
  return (
    <nav>
      <Link to="/">
        <img src="assets/logo.png" className="logo" />
      </Link>
      {isLoggedIn ? (
        <div>
          <SummonerInfo />
          <button onClick={logout}>로그아웃</button>
        </div>
        ) : (
          <div>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        )
      }
    </nav>
  );
};

export default Nav;
