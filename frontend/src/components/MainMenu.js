import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MainMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Link to="/article/popular">최근 핫한 방</Link>
      <Link to="/article/list">몇 대 몇</Link>
      <Link to="/board/general">자유게시판</Link>
      <span>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          고객센터
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/board/notice">공지사항</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/">1:1문의</Link>
          </MenuItem>
        </Menu>
      </span>
    </div>
  );
};

export default MainMenu;
