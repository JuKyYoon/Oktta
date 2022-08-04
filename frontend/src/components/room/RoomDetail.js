import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteRoom, detailRoom } from '../../services/roomService';
import { Navigate, useNavigate, useParams } from 'react-router';

const RoomDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [room, setRoom] = useState({});
  console.log('나는 왜 2번 호출 되는가...??');
  useEffect(() => {
    dispatch(detailRoom(roomId))
      .then((res) => {
        setRoom(res.payload.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const onDeleteButtonClicked = () => {
    dispatch(deleteRoom(roomId)).then((res) => {
      console.log(res);
      if (res.payload.data.messege === 'success') {
        navigate('/list');
      }
    });
  };

  return (
    <div>
      <h2>게시물 상세 페이지</h2>
      <div>
        <div>idx: {room.idx}</div>
        <div>title: {room.title}</div>
        <div>nickname: {room.nickname}</div>
        <div>content: {room.content}(html파서써야한다.... ㅎㅋㅋ)</div>
        <div>createDate: {room.createDate}</div>
        <div>modifyDate: {room.modifyDate}</div>
        <div>hit: {room.hit}</div>
        <div>live: {room.live}</div>
        <div>people: {room.people}</div>
      </div>

      <Button
        variant='outlined'
        color='veryperi'
        onClick={onDeleteButtonClicked}
      >
        방 삭제하기
      </Button>
    </div>
  );
};

export default RoomDetail;
