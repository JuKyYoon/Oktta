import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from '@mui/material';
import { updateBoard, detailBoard } from '@/services/boardService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '@/styles/board.scss';

const BoardEdit = () => {
  const { idx } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const getDetailBoard = async (idx) => {
    const result = await detailBoard(idx);

    if (result?.data?.message === 'success') {
      setTitle(result.data.boardDto.title);
      setContent(result.data.boardDto.content);
    } else {
      navigate('../list');
    }
  };

  useEffect(() => {
    getDetailBoard(idx);
  }, []);

  const onTitleChanged = (event) => {
    setTitle(event.target.value);
  };

  const onSubmitClicked = async (event) => {
    event.preventDefault();

    const body = { title: title.trim(), content };

    // 여기 else, else if 문 다시 수정하기.
    if (title && content) {
      const result = await updateBoard(idx, body);
      if (result?.data?.message === 'success') {
        navigate(`/board/${idx}`);
      } else if (result?.data?.message === 'fail') {
        alert('잘못된 요청입니다.');
        navigate('../list');
      } else {
        navigate('/error');
      }
    }
  };

  const isValid = title.trim().length >= 2 && content.trim().length >= 5;

  return (
    <div className='board'>
      <h2>게시글 수정</h2>
      <span>갈등상황을 해결해봅시다!</span>
      <span>갈등상황에 대해 제목과 간략한 설명을 적어주세요!</span>
      <hr className='hrLine'></hr>

      <div className='board-title-form'>
        <FormControl>
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
      </div>

      <div className='board-editor'>
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

      <div className='detail-footer'>
        <Button
          sx={{ mr: 2, ml: 2 }}
          className='board-button'
          variant='outlined'
          color='veryperi'
          onClick={onSubmitClicked}
          disabled={!isValid}
        >
          수정하기
        </Button>
        <Link to={`../${idx}`}>
          <Button
            className='board-button'
            sx={{ mr: 2, ml: 2 }}
            variant='outlined'
            color='veryperi'
          >
            취소
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BoardEdit;
