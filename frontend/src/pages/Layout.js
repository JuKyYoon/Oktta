import React from 'react';
import { Outlet } from 'react-router-dom';
import MainMenu from '../components/MainMenu';

const Layout = () => {
  return (
    <div>
      <MainMenu />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;
