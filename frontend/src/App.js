import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import NotFound from './components/error/NotFound';
import User from './routes/User';
import Board from './routes/Board';
import Room from './routes/Room';
import EmailAuth from './components/user/EmailAuth';
import SocialAuth from './components/user/SocialAuth';
import ServerError from './components/error/ServerError';

function App() {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route index element={<Home />} />
        <Route path='/user/*' element={<User />} />
        <Route path='/board/*' element={<Board />} />
        <Route path='/room/*' element={<Room />} />
        <Route path='/error' element={<ServerError />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='/user/auth/:token' element={<EmailAuth />} />
      <Route path='/oauth/*' element={<SocialAuth />} />
    </Routes>
  );
}

export default App;
