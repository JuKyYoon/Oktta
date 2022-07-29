import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ScreenShare from '../pages/ScreenShare';

const Article = () => {

  return (
    <Routes>
      <Route path="list" element={<Home />} />
      <Route path="create" element={<Home />} />
      <Route path="popular" element={<Home />} />
      <Route path=":id" element={<Home />} />
      <Route path=":id/share" element={<ScreenShare />} />
    </Routes>
  )
}

export default Article;
