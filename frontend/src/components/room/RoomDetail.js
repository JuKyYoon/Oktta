import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { deleteRoom, detailRoom } from '../../services/roomService';
import { createVote, deleteVote, quitVote } from '../../services/voteService';
import { Button } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '../../styles/room.scss';
import { useSelector } from 'react-redux';
import VoteChart from './VoteChart';
import RoomComment from './RoomComment';

const RoomDetail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { idx } = useParams();
  const [room, setRoom] = useState({});
  const [vote, setVote] = useState('');

  useEffect(() => {
    detailRoom(idx)
      .then((res) => {
        setRoom(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  const onDeleteButtonClicked = () => {
    deleteRoom(idx)
      .then((res) => {
        if (res.data.message === 'success') {
          navigate('../list');
        }
      })
      .catch((err) => console.log(err));
  };

  const onVoteQuitButtonClicked = () => {
    quitVote(idx)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const handleVoteChanged = (e) => {
    setVote(e.target.value);
  };

  const onVoteButtonClicked = () => {
    alert('투표하였습니다.');
    createVote(idx, vote);
    setVote('');
  };

  const onVoteCancelButtonClicked = () => {
    alert('투표를 취소하였습니다.');
    deleteVote(idx);
  };

  return (
    <div className='room'>
      <h3>게시글 상세보기</h3>
      <hr className='hrLine'></hr>
      <h1>{room.title}</h1>

      <div className='detail-body'>
        <CKEditor
          editor={ClassicEditor}
          config={{
            language: 'ko',
          }}
          data={room.content}
          onReady={(editor) => {
            editor.enableReadOnlyMode('my-feature-id');
            editor.ui.view.toolbar.element.style.display = 'none';
          }}
        />

        <div className='vote-body'>
          <div className='vote-component'>
            {!null ? (
              <VoteChart top={10} jungle={20} mid={15} adc={10} supporter={1} />
            ) : (
              <div className='vote-body'>
                <h3>투표가 진행중입니다!</h3>
                <img
                  src='../assets/donut_chart.png'
                  className='donut-chart'
                  id='donutChart'
                  alt='도넛차트'
                />
              </div>
            )}

            <div className='radio-button'>
              <h3>범인 고르기</h3>
              <label>
                <input
                  type='radio'
                  name='top'
                  value='1'
                  checked={vote === '1'}
                  onChange={handleVoteChanged}
                />
                탑
              </label>

              <label>
                <input
                  type='radio'
                  name='jungle'
                  value='2'
                  checked={vote === '2'}
                  onChange={handleVoteChanged}
                />
                정글
              </label>
              <label>
                <input
                  type='radio'
                  name='mid'
                  value='3'
                  checked={vote === '3'}
                  onChange={handleVoteChanged}
                />
                미드
              </label>
              <label>
                <input
                  type='radio'
                  name='adc'
                  value='4'
                  checked={vote === '4'}
                  onChange={handleVoteChanged}
                />
                원딜
              </label>
              <label>
                <input
                  type='radio'
                  name='supporter'
                  value='5'
                  checked={vote === '5'}
                  onChange={handleVoteChanged}
                />
                서포터
              </label>
              <Button
                size='small'
                variant='outlined'
                color='veryperi'
                onClick={onVoteButtonClicked}
              >
                투표하기
              </Button>
              <Button
                size='small'
                variant='outlined'
                color='veryperi'
                onClick={onVoteCancelButtonClicked}
              >
                투표취소
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Link to={`../list`} style={{ textDecoration: 'none' }}>
          <Button variant='outlined' color='veryperi'>
            목록으로
          </Button>
        </Link>
        {room.nickname === user.nickname ? (
          <Link to={`../edit/${room.idx}`} style={{ textDecoration: 'none' }}>
            <Button variant='outlined' color='veryperi'>
              수정하기
            </Button>
          </Link>
        ) : null}

        {room.nickname === user.nickname ? (
          <Button
            variant='contained'
            color='veryperi'
            onClick={onVoteQuitButtonClicked}
          >
            방 삭제하기
          </Button>
        ) : null}
      </div>
      <hr className='hrLine'></hr>
      <RoomComment idx={idx} />
    </div>
  );
};

export default RoomDetail;
