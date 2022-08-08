import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/user/Login";
import PwInquiry from "../components/user/PwInquiry";
import Signup from "../components/user/Signup";
import MyPage from "../components/user/MyPage";
import UpdateProfile from "../components/user/ProfileUpdate";
import { useSelector } from "react-redux";
import NotFound from "../components/error/NotFound";

const User = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="pwInquiry" element={<PwInquiry />} />
      <Route
        path="myPage"
        element={isLogin ? <MyPage /> : <Navigate to="/user/login" replace />}
      />
      <Route path="updateProfile" element={<UpdateProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default User;
