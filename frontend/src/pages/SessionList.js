import React from 'react';
import SessionInfo from '../components/SessionInfo';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, Button, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from '../services/sesseionService';

const SessionList = () => {
  // dummy data

  const dispatch = useDispatch();
  dispatch(getSession());
  const sessionList = useSelector((state) => state.session.sessions);
  const theme = createTheme({
    palette: {
      veriperi: {
        main: '#6667AB',
        contrastText: '#fff',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className='form'>
        <h1>현재 방 목록</h1>
        <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
          <Stack direction='row' justifyContent='end'>
            <Link to={`/article/create`} style={{ textDecoration: 'none' }}>
              <Button variant='contained' color='veriperi'>
                방 만들기
              </Button>
            </Link>
          </Stack>

          <nav aria-label='secondary mailbox folders'>
            <List>
              {sessionList.map((session) => {
                return (
                  <ListItem
                    disablePadding
                    key={session.id}
                    sx={{ mt: 3 }}
                    divider={true}>
                    <SessionInfo
                      title={session.title}
                      publisher={session.publisher}
                      id={session.id}
                    />
                  </ListItem>
                );
              })}
            </List>
          </nav>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default SessionList;
