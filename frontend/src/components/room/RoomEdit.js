import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { updateRoom, detailRoom } from '../../services/roomService';
import '../../styles/room.scss';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '../../styles/room.scss';

const RoomEdit = () => {
  const { idx } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  useEffect(() => {
    detailRoom(idx)
      .then((res) => {
        if (res.data.message === 'success') {
          setTitle(res.data.result.title);
          setContent(res.data.result.content);
        }
      })
      .catch((err) => {
        if (err.status === 404 || err.status === 400) {
          navigate('../list');
        }
      });
  }, []);

  const onTitleChanged = (event) => {
    setTitle(event.target.value);
  };

  const onSubmitClicked = (event) => {
    event.preventDefault();

    const body = { title, content };

    if (title && content) {
      updateRoom(idx, body)
        .then((res) => {
          if (res.data.message === 'success') {
            navigate(`/room/${idx}`);
          } else if (res.data.message === 'fail') {
            alert('잘못된 요청입니다.');
            navigate('../list');
          }
        })
        .catch(() => navigate('/error'));
    }
  };

  const isValid = Boolean(title) && Boolean(content);

  return (
    <div className='room'>
      <h2>게시글 수정</h2>
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
          data={content}
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
        />
      </div>

      <Button
        variant='outlined'
        color='veryperi'
        onClick={onSubmitClicked}
        disabled={!isValid}
      >
        수정하기
      </Button>
    </div>
  );
};

export default RoomEdit;
