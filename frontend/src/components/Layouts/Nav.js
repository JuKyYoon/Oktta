import React from 'react';
import { Link } from 'react-router-dom';
import NavLoggedIn from './NavLoggedIn';
import NavNotLoggedIn from './NavNotLoggedIn';

const Nav = () => {
  // store 연결해서 가져오기
  const isLoggedIn = true;

  // 로고 파일 교체 필요
  return (
    <nav>
      <Link to="/">
        <img src="assets/logo.png" class="logo" />
      </Link>
      {isLoggedIn ? <NavLoggedIn /> : <NavNotLoggedIn />}
    </nav>
  );
};

export default Nav;
