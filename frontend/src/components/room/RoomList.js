import React from 'react';
import RoomInfo from './RoomInfo';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, Button, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getArticle } from '../../services/roomService';

const RoomList = () => {
  // dummy data

  const dispatch = useDispatch();
  dispatch(getArticle());
  const articleList = useSelector((state) => state.article.articles);
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
            <Link to={`../create`} style={{ textDecoration: 'none' }}>
              <Button variant='contained' color='veriperi'>
                방 만들기
              </Button>
            </Link>
          </Stack>

          <nav aria-label='secondary mailbox folders'>
            <List>
              {articleList.map((article) => {
                return (
                  <ListItem
                    disablePadding
                    key={article.id}
                    sx={{ mt: 3 }}
                    divider={true}>
                    <RoomInfo
                      title={article.title}
                      publisher={article.publisher}
                      id={article.id}
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

export default RoomList;
