import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { createRoom } from '../../services/roomService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '../../styles/room.scss';

const RoomCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const onSubmitClicked = (e) => {
    e.preventDefault();
    const body = {
      title,
      content,
    };

    createRoom(body)
      .then((res) => {
        if (res.data.message === 'success') {
          navigate(`/room/${res.data.result}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const isValid = Boolean(title) && Boolean(content);

  return (
    <div className='room'>
      <h2>게시글 등록</h2>
      <span>갈등상황을 해결해봅시다!</span>
      <span>갈등상황에 대해 제목과 간략한 설명을 적어주세요!</span>
      <hr className='hrLine'></hr>

      <label htmlFor='title' className='create-room-label'>
        제목
      </label>
      <input
        className='create-room-input'
        placeholder='제목을 입력해주세요.'
        type='text'
        name='title'
        value={title}
        onChange={onTitleChanged}
      />
      <label htmlFor='title' className='create-room-label'>
        내용
      </label>
      <div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            language: 'ko',
            placeholder: '갈등내용을 입력해주세요',
          }}
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
        />
      </div>

      <Button
        variant='outlined'
        color='veryperi'
        onClick={onSubmitClicked}
        disabled={!isValid}>
        등록하기
      </Button>
    </div>
  );
};

export default RoomCreate;
