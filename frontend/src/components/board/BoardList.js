import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Pagination } from '@mui/material';
import { getBoardList, boardHitRequest } from '@/services/boardService';
import '@/styles/board.scss';
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

const BoardList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(10);
  const [boards, setBoards] = useState([]);
  const nowTime = dayjs();
  dayjs.extend(utc);

  const createBoardList = async (currentPage) => {
    const result = await getBoardList(currentPage);
    if (result?.data?.message === 'success') {
      setBoards(result.data.list);
      setLastPage(result.data.lastPage);
    }
  };

  const boardHit = async (boardIdx) => {
    boardHitRequest(boardIdx);
  };

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
    createBoardList(currentPage);
  }, []);

  const onChangeHandler = (event, page) => {
    setCurrentPage(page);
    createBoardList(page);
  };

  return (
    <div>
      {/* {boards ? ( */}
      <div className='board'>
        <h1>게시글 목록</h1>
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
                  <TableCell align='center'>제목</TableCell>
                  <TableCell align='center'>작성일</TableCell>
                  <TableCell align='center'>작성자</TableCell>
                  <TableCell align='center'>조회수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {boards.map((board) => (
                  <TableRow key={board.idx}>
                    <TableCell align='center'>
                      <Link
                        onClick={() => boardHit(`${board.idx}`)}
                        to={`../${board.idx}`}
                        style={{ textDecoration: 'none' }}
                      >
                        {board.title}
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      {dateFormat(board.createDate)}
                    </TableCell>
                    <TableCell align='center'>{board.nickname}</TableCell>
                    <TableCell align='center'>{board.hit}</TableCell>
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
      {/* ) : (
        <Loading />
      )} */}
    </div>
  );
};

export default BoardList;
