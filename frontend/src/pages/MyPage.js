import React from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {

  return (
    <div>
      <h2>마이페이지</h2>
      <Link to="/user/updateProfile">회원정보수정</Link>
    </div>
  );
};

export default MyPage;
