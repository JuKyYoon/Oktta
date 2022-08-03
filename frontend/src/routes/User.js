import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import PwInquiry from '../pages/pwInquiry';
import Signup from '../pages/Signup';
import MyPage from '../pages/MyPage';
import UpdateProfile from '../pages/UpdateProfile'
import { useSelector } from 'react-redux';

const User = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="pwInquiry" element={<PwInquiry />} />
      <Route path="myPage" element={isLogin ? <MyPage /> : <Navigate to="/user/login" replace />} />
      <Route path="updateProfile" element={<UpdateProfile />} />
    </Routes>
  )
}

export default User;
