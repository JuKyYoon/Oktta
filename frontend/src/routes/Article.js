import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ArticleList from '../pages/ArticleList';
import CreateArticle from '../pages/CreateArticle';

const Article = () => {
  return (
    <Routes>
      <Route path='list' element={<ArticleList />} />
      <Route path='create' element={<CreateArticle />} />
      <Route path='popular' element={<Home />} />
      <Route path=':id' element={<Home />} />
      <Route path=':id/share' element={<Home />} />
    </Routes>
  );
};

export default Article;
