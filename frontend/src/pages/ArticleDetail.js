import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOvToken, setRole } from '../modules/article';
import { axiosAuth } from '../services/axios';

const ArticleDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createSession = () => {
    axiosAuth.post(`/api/v1/session/${params.id}`)
    .then((res) => res.data.result)
    .catch((err) => console.log(err))
    .then((token) => {
      dispatch(setOvToken(token))
      dispatch(setRole('publisher'))
    })
    .then(() => navigate('share'))
  }

  return (
    <div>
      <h2>{params.id}</h2>
      <Button onClick={createSession}>생성</Button>
      <Button>참여</Button>
      <Link to={`/article/${parseInt(params.id) + 1}`}>번호올리기</Link>
    </div>
  );
};

export default ArticleDetail;
