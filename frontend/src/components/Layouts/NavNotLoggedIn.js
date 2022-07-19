import React from 'react';
import { Link } from 'react-router-dom';

const NavNotLoggedIn = () => {

  return (
    <div>
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default NavNotLoggedIn;
