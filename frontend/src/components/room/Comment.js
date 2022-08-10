import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Pagination } from '@mui/material';

import '../../styles/room.scss';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Loading from '../layout/Loading';

const Comment = () => {
  const { idx } = useParams();
  console.log(idx);
  return (
    <div>
      <div className='room'>
        <h3>댓글목록</h3>
        <Link to={`../create`} style={{ textDecoration: 'none' }}>
          <Button variant='contained' color='veryperi'>
            방 만들기
          </Button>
        </Link>

        <Pagination
          count={1}
          page={1}
          showFirstButton
          showLastButton
          //   onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default Comment;
