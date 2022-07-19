import React from "react"
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const goHome = () => {
    // 홈페이지로 이동
    navigate('/');
  };

  const goBack = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };

  return (
    <div>
      <header style={{ background: 'lightgray', padding: 16, fontSize: 24 }}>
        <button onClick={goHome}>홈</button>
        <button onClick={goBack}>뒤로가기</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
