import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import MyPage from '../pages/MyPage';
import UpdateProfile from '../pages/UpdateProfile'

const User = () => {

  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Home />} />
      <Route path="pwInquiry" element={<Home />} />
      <Route path="myPage" element={<MyPage />} />
      <Route path="updateProfile" element={<UpdateProfile />} />
    </Routes>
  )
}

export default User;
