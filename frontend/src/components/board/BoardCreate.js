import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { createBoard } from '../../services/boardService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '@/styles/board.scss';

const BoardCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const onTitleChanged = (event) => {
    setTitle(event.target.value);
  };

  const onSubmitClicked = async (event) => {
    event.preventDefault();
    const body = {
      title: title.trim(),
      content,
    };

    const result = await createBoard(body);
    if (result?.data?.message === 'success') {
      
      navigate(`/board/${result.data.result}`);
    } else if (result?.response?.status === 403) {
      console.log('no token입니다');
    } else {
      navigate('/error');
    }
  };

  const isValid = title.trim().length >= 2 && title.trim().length < 50 && content.trim().length >= 2;

  return (
    <div className='board'>
      <h2>게시글 등록</h2>
      <span>자유롭게 소통해요!</span>
      <hr className='hrLine'></hr>

      <FormControl className='board-title-form' sx={{ width:"50%", margin: '20px 0'}}>
        <InputLabel htmlFor='title' color='veryperi'>
          제목
        </InputLabel>
        <Input
          id='title'
          type='text'
          aria-describedby='title-helper-text'
          color='veryperi'
          value={title}
          onChange={onTitleChanged}
        />
        <FormHelperText id='title-helper-text'>
          제목을 입력해주세요.
        </FormHelperText>
      </FormControl>

      <div className='board-editor'>
        <div>
          <CKEditor
            editor={ClassicEditor}
            config={{
              language: 'ko',
              placeholder: '내용을 자유롭게 작성해주세요!!',
            }}
            onChange={(event, editor) => {
              setContent(editor.getData());
            }}
          />
        </div>
      </div>
      <Button
        className='board-button'
        variant='outlined'
        color='veryperi'
        onClick={onSubmitClicked}
        disabled={!isValid}
      >
        등록하기
      </Button>
    </div>
  );
};

export default BoardCreate;
