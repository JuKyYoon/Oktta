import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const pages = [
    ['ON AIR', '/room/popular'],
    ['옥상', '/room/list'],
    ['자유게시판', '/board/list'],
  ];

  return (
    <div className='nav-bar'>
      {pages.map((page, idx) => (
        <Link to={page[1]} key={idx}>
          <Button sx={{ mr: 4, color: 'black', display: 'block' }}>
            {page[0]}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
