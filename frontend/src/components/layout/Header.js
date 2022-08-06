import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material';
import { theme } from '../../styles/style';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../services/userService';

// 나중에 바꾸기
const pages = [
  ['최근 핫한 방', '/room/popular'],
  ['몇 대 몇', '/room/list'],
  ['자유게시판', '/article/general'],
  ['고객센터', '/article/notice'],
];

const Header = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logoutRequest())
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='static' color='veryperi'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Link to='/'>
              <img src='/../assets/oktta.png' width={150} />
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, idx) => (
                <Link to={page[1]} key={idx}>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    {page[0]}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box
              sx={{ display: { xs: 'none', md: 'flex' } }}
              className='LoginButtonChange'>
              {state.user.isLogin ? (
                <>
                  <Button
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    onClick={onLogoutHandler}>
                    로그아웃
                  </Button>
                  <Link to='/user/myPage'>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      마이페이지
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/user/login'>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      로그인
                    </Button>
                  </Link>
                  <Link to='/user/signup'>
                    <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                      회원가입
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default Header;
