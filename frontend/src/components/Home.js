import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const state = useSelector(state => state);

  return (
    <div className={`main-content ${state.user.auth === '0' ? "user-no-auth" : null}`}>
      <div className="block-box">
        <div className="content">
          <h2>ON AIR</h2>
          <h2>ON AIR</h2>
        </div>
      </div>
      <div className="block-box">
        <div className="content-disabled">
          <h2>옥상</h2>
          <h2>옥상</h2>
        </div>
      </div>
      <div className="block-box">
        <div className="content-disabled">
          <h2>자유게시판</h2>
          <h2>자유게시판</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
