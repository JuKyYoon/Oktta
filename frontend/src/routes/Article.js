import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ScreenShare from '../pages/ScreenShare';
import ArticleDetail from '../pages/ArticleDetail';

const Article = () => {

  return (
    <Routes>
      <Route path="list" element={<Home />} />
      <Route path="create" element={<Home />} />
      <Route path="popular" element={<Home />} />
      <Route path=":id" element={<ArticleDetail />} />
      <Route path=":id/share" element={<ScreenShare />} />
    </Routes>
  )
}

export default Article;
