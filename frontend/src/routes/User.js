import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PwInquiry from '../pages/pwInquiry';
import Signup from '../pages/Signup';
import MyPage from '../pages/MyPage';
import UpdateProfile from '../pages/UpdateProfile'

const User = () => {

  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="pwInquiry" element={<PwInquiry />} />
      <Route path="myPage" element={<MyPage />} />
      <Route path="updateProfile" element={<UpdateProfile />} />
    </Routes>
  )
}

export default User;
