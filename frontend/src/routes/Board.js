import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

const Board = () => {

  return (
    <Routes>
      <Route path="notice" element={<Home />} />
      <Route path="general" element={<Home />} />
    </Routes>
  )
}

export default Board;
