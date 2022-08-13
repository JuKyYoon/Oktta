import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../services/userService";
import BeforeEmailAuth from "../user/BeforeEmailAuth";
import Navbar from "./Navbar";
import { LOGOUT } from "@/modules/types";

const Header = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    logoutRequest();
    // 엑세스 토큰 제외하고 로그아웃
    dispatch({
      type: LOGOUT
    });
    navigate('/');
  };

  return (
    <div className="header-main-div">
      <div className="header">
        <Link to="/">
          <img src="/../assets/logo.png" className="logo" />
        </Link>
        {state.user.isLogin ? (
          <div className="header-right-btn">
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={onLogoutHandler}
            >
              로그아웃
            </Button>
            <Link to="/user/myPage">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                {state.user.nickname}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="header-right-btn">
            <Link to="/user/login">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                로그인
              </Button>
            </Link>
            <Link to="/user/signup">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                회원가입
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Navbar />
      {state.user.auth === "0" && <BeforeEmailAuth />}
    </div>
  );
};
export default Header;
