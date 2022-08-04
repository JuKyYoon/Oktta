import React, { useState, useEffect } from 'react';
import RoomInfo from './RoomInfo';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, Button, Stack, Pagination } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getRoom } from '../../services/roomService';
import '../../styles/room.scss';

const RoomList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [rooms, setRooms] = useState([]);

  const onChangeHandler = (e, page) => {
    setCurrentPage(page);
    dispatch(getRoom(page))
      .then((res) => {
        if ((res.payload.data.message = 'success')) {
          setRooms(res.payload.data.room);
          setLastPage(res.payload.data.lastPage);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='room'>
      <h1>현재 방 목록</h1>
      <Box sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
        <Stack direction='row' justifyContent='end'>
          <Link to={`../create`} style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='veryperi'>
              방 만들기
            </Button>
          </Link>
        </Stack>

        <nav aria-label='secondary mailbox folders'>
          <List>
            {rooms.map((room) => {
              return (
                <ListItem
                  disablePadding
                  key={room.id}
                  sx={{ mt: 3 }}
                  divider={true}
                >
                  <RoomInfo
                    title={room.title}
                    publisher={room.title}
                    id={room.id}
                  />
                </ListItem>
              );
            })}
          </List>
        </nav>
        <Pagination
          count={lastPage}
          page={currentPage}
          showFirstButton
          showLastButton
          onChange={onChangeHandler}
        />
      </Box>
    </div>
  );
};

export default RoomList;
