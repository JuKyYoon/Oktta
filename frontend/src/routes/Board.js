import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/components/error/NotFound';
import Home from '@/components/Home';
import BoardList from '@/components/board/BoardList';
import BoardCreate from '@/components/board/BoardCreate';
import BoardDetail from '@/components/board/BoardDetail';
import BoardEdit from '@/components/board/BoardEdit';
const Board = () => {
  return (
    <Routes>
      <Route path='list' element={<BoardList />} />
      <Route path='create' element={<BoardCreate />} />
      <Route path=':idx' element={<BoardDetail />} />
      <Route path='edit/:idx' element={<BoardEdit />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Board;
