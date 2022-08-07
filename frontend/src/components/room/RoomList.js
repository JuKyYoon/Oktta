import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Pagination } from '@mui/material';
import { getRoomList } from '../../services/roomService';
import '../../styles/room.scss';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const RoomList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRoomList(currentPage)
      .then((res) => {
        setRooms(res.data.list);
        setLastPage(res.data.lastPage);
      })
      .catch((err) => console.log(err));
  }, []);

  const onChangeHandler = (e, page) => {
    setCurrentPage(page);

    getRoomList(page)
      .then((res) => {
        setRooms(res.data.list);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='room'>
      <h1>현재 방 목록</h1>

      <Link to={`../create`} style={{ textDecoration: 'none' }}>
        <Button variant='contained' color='veryperi'>
          방 만들기
        </Button>
      </Link>
      <div>
        <TableContainer>
          <Table sx={{ minWidth: 800, width: '100%' }}>
            <TableHead sx={{ borderBottom: 'solid' }}>
              <TableRow>
                <TableCell align='center'>라이브 상태</TableCell>
                <TableCell align='center'>제목</TableCell>
                <TableCell align='center'>작성일</TableCell>
                <TableCell align='center'>작성자</TableCell>
                <TableCell align='center'>추천수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.idx}>
                  <TableCell align='center'>
                    {room.live ? '🔊' : '🔈'}
                  </TableCell>
                  <TableCell align='center'>
                    <Link
                      to={`../${room.idx}`}
                      style={{ textDecoration: 'none' }}>
                      {room.title}
                    </Link>
                  </TableCell>
                  <TableCell align='center'>
                    {room.createDate.substr(0, 10)}
                  </TableCell>
                  <TableCell align='center'>{room.nickname}</TableCell>
                  <TableCell align='center'>{room.hit}</TableCell>
                  <TableCell align='center'>
                    <Link
                      to={`../${room.idx}`}
                      style={{ textDecoration: 'none' }}>
                      입장하기🔥
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination
        count={lastPage}
        page={currentPage}
        showFirstButton
        showLastButton
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default RoomList;
