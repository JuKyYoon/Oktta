import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SessionList from '../pages/SessionList';
import CreateSession from '../pages/CreateSession';

const Article = () => {
  return (
    <Routes>
      <Route path='list' element={<SessionList />} />
      <Route path='create' element={<CreateSession />} />
      <Route path='popular' element={<Home />} />
      <Route path=':id' element={<Home />} />
      <Route path=':id/share' element={<Home />} />
    </Routes>
  );
};

export default Article;
