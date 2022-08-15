import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pagination } from '@mui/material';
import Loading from '../layout/Loading';
import { getRoomList, roomHitRequest } from '../../services/roomService';
import '../../styles/room.scss';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeHigh,
  faVolumeXmark,
  faArrowRightToBracket,
  faFire,
} from '@fortawesome/free-solid-svg-icons';

const RoomList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [rooms, setRooms] = useState(false);

  const createRoomList = async (currentPage) => {
    const result = await getRoomList(currentPage);
    if (result?.data?.message === 'success') {
      setRooms(result.data.list);
      setLastPage(result.data.lastPage);
    } else {
      alert('게시물 불러오기 실패');
      navigate('/');
    }
  };

  const roomHit = async (roomIdx) => {
    roomHitRequest(roomIdx);
  };

  useEffect(() => {
    createRoomList(currentPage);
  }, []);

  const onChangeHandler = (event, page) => {
    setCurrentPage(page);
    createRoomList(page);
  };

  return (
    <div>
      {rooms ? (
        <div className='room'>
          <h1>옥상 목록</h1>
          <Link
            className='create-button'
            to={`../create`}
            style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='veryperi'>
              방 만들기
            </Button>
          </Link>
          <div className='table-container'>
            <TableContainer>
              <Table>
                <TableHead sx={{ borderBottom: 'solid' }}>
                  <TableRow>
                    <TableCell align='center'>라이브 상태</TableCell>
                    <TableCell align='center'>제목</TableCell>
                    <TableCell align='center'>작성일</TableCell>
                    <TableCell align='center'>작성자</TableCell>
                    <TableCell align='center'>조회수</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow key={room.idx}>
                      <TableCell align='center'>
                        {room.live ? (
                          <FontAwesomeIcon icon={faVolumeHigh} />
                        ) : (
                          <FontAwesomeIcon icon={faVolumeXmark} />
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        <Link
                          onClick={() => roomHit(`${room.idx}`)}
                          to={`../${room.idx}`}
                          style={{ textDecoration: 'none' }}>
                          {room.title}
                        </Link>
                      </TableCell>
                      <TableCell align='center'>
                        {room.createDate.substr(0, 10)}
                      </TableCell>
                      <TableCell align='center'>{room.nickname}</TableCell>
                      <TableCell align='center'>
                        {room.hit > 5 ? (
                          <span>
                            {room.hit + ' '}
                            <FontAwesomeIcon icon={faFire} color='red' />
                          </span>
                        ) : (
                          room.hit
                        )}
                      </TableCell>
                      <TableCell align='center'>
                        <Link
                          to={`../${room.idx}`}
                          style={{ textDecoration: 'none' }}>
                          입장하기
                          <FontAwesomeIcon
                            icon={faArrowRightToBracket}
                            size='lg'
                          />
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
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default RoomList;
