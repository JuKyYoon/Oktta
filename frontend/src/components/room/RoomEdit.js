import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { updateRoom, getRoom } from '../../services/roomService';

const RoomEdit = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(getRoom());
  const room = useSelector((state) =>
    state.room.rooms.find((room) => room.id === roomId)
  );

  const [title, setTitle] = useState(room.title);
  const [content, setContent] = useState(room.content);

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e) => {
    setContent(e.target.value);
  };

  const onSubmitClicked = (e) => {
    e.preventDefault();
    const body = {
      id: roomId,
      title,
      content,
    };

    if (title && content) {
      dispatch(updateRoom(body))
        .then((res) => {
          if (res.payload.data.message === 'success') {
            navigate('/room/list');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const isValid = Boolean(title) && Boolean(content);

  return (
    <div className='create-article'>
      <h2>게시글 수정</h2>
      {/* <span>갈등상황을 해결해봅시다!</span> */}
      {/* <span>갈등상황에 대해 제목과 간략한 설명을 적어주세요!</span> */}
      <hr className='hrLine'></hr>

      <label htmlFor='title' className='create-article-label'>
        제목
      </label>
      <input
        className='create-article-input'
        placeholder={'제목을 입력해주세요.'}
        type='text'
        name='title'
        value={title}
        onChange={onTitleChanged}
      />

      <label htmlFor='content' className='create-article-label'>
        설명
      </label>
      <textarea
        className='create-article-textarea'
        placeholder='상황을 설명해주세요.'
        type='textarea'
        name='content'
        value={content}
        onChange={onContentChanged}
      />

      <Button
        variant='outlined'
        color='veryperi'
        onClick={onSubmitClicked}
        disabled={!isValid}
      >
        수정 완료
      </Button>
    </div>
  );
};

export default RoomEdit;
