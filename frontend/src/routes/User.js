import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/user/Login';
import PwInquiryEmailSend from '../components/user/PwInquiryEmailSend';
import PwInquiryNewPassword from '../components/user/PwInquiryNewPassword';
import Signup from '../components/user/Signup';
import MyPage from '../components/user/MyPage';
import UpdateProfile from '../components/user/ProfileUpdate';
import TierAuth from '@/components/user/TierAuth';
import NotFound from '../components/error/NotFound';

const User = () => {
  return (
    <Routes>
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='pwInquiry' element={<PwInquiryEmailSend />} />
      <Route path='auth/password/:token' element={<PwInquiryNewPassword />} />
      <Route path="myPage" element={<MyPage />} />
      <Route path="updateProfile" element={<UpdateProfile />} />
      <Route path="tierAuth" element={<TierAuth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default User;
