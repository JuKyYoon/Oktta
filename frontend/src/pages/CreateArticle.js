import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const onContentChanged = (e) => {
    setContent(e.target.value);
  };

  const onSubmitClicked = () => {
    if (title && content) {
      navigate('/article/list');
    }
  };

  const isValid = Boolean(title) && Boolean(content);

  return (
    <div className='create-article'>
      <h2>게시글 등록</h2>
      <span>갈등상황을 해결해봅시다!</span>
      <span>갈등상황에 대해 제목과 간략한 설명을 적어주세요!</span>
      <hr className='hrLine'></hr>

      <label htmlFor='title' className='create-article-label'>
        제목
      </label>
      <input
        className='create-article-input'
        placeholder='제목을 입력해주세요.'
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
      <label htmlFor='video' className='create-article-label'>
        동영상 첨부하기
      </label>

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

export default CreateArticle;
