import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/user/Login';
import PwInquiryEmailSend from '../components/user/PwInquiryEmailSend';
import PwInquiryNewPassword from '../components/user/PwInquiryNewPassword';
import Signup from '../components/user/Signup';
import MyPage from '../components/user/MyPage';
import UpdateProfile from '../components/user/ProfileUpdate';
import { useSelector } from 'react-redux';

const User = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <Routes>
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='pwInquiry' element={<PwInquiryEmailSend />} />
      <Route path='auth/:token' element={<PwInquiryNewPassword />} />
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
