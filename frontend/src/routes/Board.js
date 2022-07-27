import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ScreenShare from '../pages/ScreenShare';

const Board = () => {

  return (
    <Routes>
      <Route path="notice" element={<Home />} />
      <Route path="general" element={<Home />} />
      <Route path="screen" element={<ScreenShare />} />
    </Routes>
  )
}

export default Board;
