import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';

const User = () => {

  return (
    <Routes>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Home />} />
      <Route path="pwInquiry" element={<Home />} />
      <Route path="myPage" element={<Home />} />
    </Routes>
  )
}

export default User;
