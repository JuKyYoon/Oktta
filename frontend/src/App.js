import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Layout from './pages/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/pwInquiry" element={<Home />} />
        <Route path="/myPage" element={<Home />} />
        <Route path="/noticeBoard" element={<Home />} />
        <Route path="/generalBoard" element={<Home />} />
        <Route path="/article/list" element={<Home />} />
        <Route path="/article/create" element={<Home />} />
        <Route path="/article/popular" element={<Home />} />
        <Route path="/article/:id" element={<Home />} />
        <Route path="/article/:id/share" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App