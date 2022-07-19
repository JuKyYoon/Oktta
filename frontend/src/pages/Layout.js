import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/layouts/Nav';

const Layout = () => {
  return (
    <div>
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;
