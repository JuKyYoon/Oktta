import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import User from './routes/User';
import Board from './routes/Board';
import ArticleDetail from './routes/Article';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/board/*" element={<Board />} />
        <Route path="/article/*" element={<ArticleDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App