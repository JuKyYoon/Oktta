import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home';

const Article = () => {
  return (
    <Routes>
      <Route path='notice' element={<Home />} />
      <Route path='general' element={<Home />} />
    </Routes>
  );
};

export default Article;
