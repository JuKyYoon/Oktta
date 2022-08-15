import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/error/NotFound';
import Home from '../components/Home';

const Board = () => {
  return (
    <Routes>
      <Route path='notice' element={<Home />} />
      <Route path='general' element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Board;
