import React from 'react';
import { Routes, Route } from 'react-router';
import Home from '../components/Home';
import ScreenShare from '../components/session/ScreenShare';
import RoomList from '../components/room/RoomList';
import RoomCreate from '../components/room/RoomCreate';
import RoomDetail from '../components/room/RoomDetail';
import RoomEdit from '../components/room/RoomEdit';
import NotFound from '../components/error/NotFound';

const Room = () => {
  return (
    <Routes>
      <Route path='list' element={<RoomList />} />
      <Route path='create' element={<RoomCreate />} />
      <Route path='edit/:idx' element={<RoomEdit />} />
      <Route path='popular' element={<Home />} />
      <Route path='/:idx' element={<RoomDetail />} />
      <Route path=':id/share' element={<ScreenShare />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Room;
