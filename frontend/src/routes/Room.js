import React from 'react';
import { Routes, Route } from 'react-router';
import Home from '../components/Home';
import ScreenShare from '../components/session/ScreenShare';
import RoomList from '../components/room/RoomList';
import RoomCreate from '../components/room/RoomCreate';
import RoomDetail from '../components/room/RoomDetail';
import RoomEdit from '../components/room/RoomEdit';

const Room = () => {
  return (
    <Routes>
      <Route path='list' element={<RoomList />} />
      <Route path='create' element={<RoomCreate />} />
      <Route path='edit/:articleId' element={<RoomEdit />} />
      <Route path='popular' element={<Home />} />
      <Route path=':id' element={<RoomDetail />} />
      <Route path=':id/share' element={<ScreenShare />} />
    </Routes>
  );
};

export default Room;
