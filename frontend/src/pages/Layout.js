import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {

  const isLoggedIn = false;
  const summoner = false;

  const logout = () => {
    // store에서 정의
  };

  return (
    <div>
      <nav>
        <Link to="/">
          <img src="/assets/logo.png" className="logo" />
        </Link>
        {isLoggedIn ? (
          <div>
            {
              (summoner) ? (
                <div>
                  <p>티어</p>
                  <p>소환사명</p>
                  <p>닉네임</p>
                </div>
              ) : (
                <div>
                  <Link to="/">티어 인증</Link>
                  <p>닉네임</p>
                </div>
              )
            }
            <button onClick={logout}>로그아웃</button>
          </div>
        ) : (
          <div>
            <Link to="user/login">로그인</Link>
            <Link to="user/signup">회원가입</Link>
          </div>
        )
        }
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;
