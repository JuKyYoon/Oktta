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
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeHigh,
  faVolumeXmark,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

const RoomList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [rooms, setRooms] = useState(false);
  const nowTime = dayjs();
  dayjs.extend(utc);

  const createRoomList = async (currentPage) => {
    const result = await getRoomList(currentPage);
    if (result?.data?.message === 'success') {
      setRooms(result.data.list);
      setLastPage(result.data.lastPage);
    }
  };

  const roomHit = async (roomIdx) => {
    const result = await roomHitRequest(roomIdx);
    if (result?.data?.message === 'success') {
      navigate(`../${roomIdx}`);
    }
  }

  const dateFormat = (date) => {
    if (date == undefined) {
      return "";
    }
    date = dayjs.utc(date).local();
    let diffDate = nowTime.diff(date, "d");
    if (diffDate == 0) {
      return `${nowTime.diff(date, "h")}시간 전`;
    } else {
      return date.format("YYYY년 MM월 DD일");
    }
  };


  useEffect(() => {
    createRoomList(currentPage);
  }, []);

  const onChangeHandler = (event, page) => {
    setCurrentPage(page);
    createRoomList(page);
  };

  return (
    <>
      {rooms ? (
        <div className='room'>
          <h1>옥상 목록</h1>
          <Link
            className='create-button'
            to={`../create`}
            style={{ textDecoration: 'none' }}
          >
            <Button variant='contained' color='veryperi'>
              방 만들기
            </Button>
          </Link>
          <div className='table-container'>
            <TableContainer>
              <Table>
                <TableHead sx={{ borderBottom: 'solid' }}>
                  <TableRow>
                    <TableCell align='center' width="10%">라이브</TableCell>
                    <TableCell align='center' width="42%">제목</TableCell>
                    <TableCell align='center' width="16%">작성자</TableCell>
                    <TableCell align='center' width="16%">작성일</TableCell>
                    <TableCell align='center' width="10%">조회수</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rooms.map((room) => (
                    <TableRow key={room.idx} onClick={() => roomHit(`${room.idx}`)} hover>
                      <TableCell align='center'>
                        {room.live ? (
                          <FontAwesomeIcon icon={faVolumeHigh} />
                        ) : (
                          <FontAwesomeIcon icon={faVolumeXmark} />
                        )}
                      </TableCell>
                      <TableCell align='left'>
                        {room.title.length > 50 ? room.title.slice(0, 50) + '...' : room.title}
                      </TableCell>
                      <TableCell align='left'>{room.nickname}</TableCell>
                      <TableCell align='center'>
                        {dateFormat(room.createDate)}
                      </TableCell>
                      <TableCell align='center'>{room.hit}</TableCell>
                      {/* <TableCell align='center'>
                        <Link
                          to={`../${room.idx}`}
                          style={{ textDecoration: 'none' }}
                        >
                          입장하기
                          <FontAwesomeIcon
                            icon={faArrowRightToBracket}
                            size='lg'
                          />
                        </Link>
                      </TableCell> */}
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
    </>
  );
};

export default RoomList;
