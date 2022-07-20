import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function HelpDesk() {
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
          <Link to="/">공지사항</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/">1:1문의</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

const HomeMenu = () => {

  return (
    <div>
      <Link to="/">최근 핫한 방</Link>
      <Link to="/">몇 대 몇</Link>
      <Link to="/">자유게시판</Link>
      <HelpDesk />
    </div>
  );
};

export default HomeMenu;
