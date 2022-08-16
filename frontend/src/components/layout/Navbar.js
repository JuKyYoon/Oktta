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
                <Link to={page[1]} key={idx} className={`nav-menu ${idx === 1 ? "nav-menu-middle" : ""}`}>
                        {page[0]}
                </Link>
            ))}
        </div>
    )
}

export default Navbar;
