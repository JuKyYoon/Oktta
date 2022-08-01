import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOvToken, setRole } from '../modules/article';
import { joinSessionRequest, createSessionRequest } from '../services/sessionService';

const ArticleDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createSession = () => {
    createSessionRequest(params.id)
    .then((token) => {
      dispatch(setOvToken(token))
      dispatch(setRole('publisher'))
    })
    .then(() => navigate('share'))
  }

  const joinSession = () => {
    joinSessionRequest(params.id)
    .then((token) => {
      dispatch(setOvToken(token))
      dispatch(setRole('subscriber'))
    })
    .then(() => navigate('share'))
  }

  return (
    <div>
      <h2>{params.id}</h2>
      <Button onClick={createSession}>생성</Button>
      <Button onClick={joinSession}>참여</Button>
      <Link to={`/article/${parseInt(params.id) + 1}`}>번호올리기</Link>
    </div>
  );
};

export default ArticleDetail;
