import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';

const Article = () => {

  return (
    <Routes>
      <Route path="list" element={<Home />} />
      <Route path="create" element={<Home />} />
      <Route path="popular" element={<Home />} />
      <Route path=":id" element={<Home />} />
      <Route path=":id/share" element={<Home />} />
    </Routes>
  )
}

export default Article;
