import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest } from "../../services/userService";
import BeforeEmailAuth from "../user/BeforeEmailAuth";
import Navbar from "./Navbar";
import { LOGOUT } from "@/modules/types";

const Header = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    logoutRequest();
    // 엑세스 토큰 제외하고 로그아웃
    dispatch({
      type: LOGOUT,
    });
    navigate("/");
  };

  const tierInfo = '../assets/lol_tiers_ico/' + parseInt(state.user.tier / 10) + '.ico'

  const goTierAuth = () => {
    navigate('/user/tierAuth');
  }

  return (
    <div className="header-main-div" >
      <div className="header">
        <Link to="/" className="logo">
          <img src="/../assets/logo.png" className="logo-image" />
        </Link>
        {state.user.isLogin ? (
          <div className="header-right">
            {state.user.tier ?            
              <Button sx={{"&:disabled":{
                color: "black"
              }, cursor: "default"}} disabled>
                <img src={tierInfo} /> {state.user.summonerName}
              </Button> :
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                  onClick={goTierAuth}
                >
                  티어 인증하기
                </Button>
            }
            <Link to="/user/myPage" className="header-right-btn">
              <Button sx={{ my: 2, color: "black", display: "block" }}>
                {state.user.nickname}
              </Button>
            </Link>
            <Button
              sx={{ my: 2, color: "black", display: "block" }}
              onClick={onLogoutHandler}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          <div className="header-right">
            <Link to="/user/login" className="header-right-btn">
              {/* <Button sx={{ my: 2, color: "black", display: "block" }}> */}
                로그인
              {/* </Button> */}
            </Link>
            <Link to="/user/signup" className="header-right-btn">
              {/* <Button sx={{ my: 2, color: "black", display: "block" }}> */}
                회원가입
              {/* </Button> */}
            </Link>
          </div>
        )}
      </div>
      <Navbar />
      {state.user.auth === "0" && <BeforeEmailAuth />}
    </div >
  );
};
export default Header;
