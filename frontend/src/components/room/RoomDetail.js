import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { deleteRoom, detailRoom } from '../../services/roomService';
import { Button } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '../../styles/room.scss';
import { useSelector } from 'react-redux';
import VoteChart from './VoteChart';

const RoomDetail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { idx } = useParams();
  const [room, setRoom] = useState({});
  const [vote, setVote] = useState({});

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
  const handleVoteChanged = (e) => {
    setVote(e.target.value);
  };

  const onVoteButtonClicked = () => {
    alert('투표하였습니다.');
    setVote('');
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
          <h2>투표현황</h2>
          <div className='vote-component'>
            <VoteChart top={10} jungle={20} mid={15} adc={10} supporter={1} />
            <div className='radio-button'>
              <h3>범인 고르기</h3>
              <label>
                <input
                  type='radio'
                  value='top'
                  checked={vote === 'top'}
                  onChange={handleVoteChanged}
                />
                탑
              </label>

              <label>
                <input
                  type='radio'
                  value='jungle'
                  checked={vote === 'jungle'}
                  onChange={handleVoteChanged}
                />
                정글
              </label>
              <label>
                <input
                  type='radio'
                  value='mid'
                  checked={vote === 'mid'}
                  onChange={handleVoteChanged}
                />
                미드
              </label>
              <label>
                <input
                  type='radio'
                  value='adc'
                  checked={vote === 'adc'}
                  onChange={handleVoteChanged}
                />
                원딜
              </label>
              <label>
                <input
                  type='radio'
                  value='supporter'
                  checked={vote === 'supporter'}
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
            onClick={onDeleteButtonClicked}
          >
            방 삭제하기
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default RoomDetail;
