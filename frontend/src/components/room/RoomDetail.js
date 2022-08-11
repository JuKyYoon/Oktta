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

  const [voteDto, setVoteDto] = useState(null);

  useEffect(() => {
    detailRoom(idx)
      .then((res) => {
        // 투표가 종료된 방이면 voteDto값 설정해주기
        if (res.data.message === 'success' && res.data.result.voteDto) {
          setVoteDto(res.data.result.voteDto);
        }
        setRoom(res.data.result);
      })
      .catch((err) => {
        if (err.status === 404 || err.status === 400) {
          navigate('../list');
        }
      });
  }, [vote]);

  const onDeleteButtonClicked = () => {
    deleteRoom(idx)
      .then((res) => {
        // 200 성공이면 삭제
        if (res.data.message === 'success') {
          navigate('../list');
        }
        // 200 실패이면 남의 글 삭제
        else if (res.data.message === 'fail') {
          alert('잘못된 요청입니다.');
        }
      })
      .catch(() => {
        navigate('../list');
      });
  };

  const onVoteEndButtonClicked = () => {
    quitVote(idx)
      .then((res) => {
        if (res.data.message === 'success') {
          setVote('-1');
        } else if (res.data.message === 'fail') {
          alert('접근 권한이 없습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/error');
      });
  };
  const handleVoteChanged = (e) => {
    setVote(e.target.value);
  };

  const onVoteButtonClicked = () => {
    createVote(idx, vote)
      .then((res) => {
        if (res.data.message === 'success') {
          alert('투표하였습니다.');
        } else {
          alert('투표에 실패하였습니다...');
        }
      })
      .catch((err) => console.log(err));
    setVote('');
  };

  const onVoteCancelButtonClicked = () => {
    deleteVote(idx)
      .then((res) => {
        if (res.data.message === 'success') {
          alert('투표를 철회하였습니다.');
          setVote('');
        } else if (res.data.message === 'fail') {
          alert('먼저 투표를 해주세요!');
          setVote('');
        }
      })
      .catch((err) => console.log(err));
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
            {voteDto ? (
              <VoteChart
                top={voteDto.first}
                jungle={voteDto.second}
                mid={voteDto.third}
                adc={voteDto.fourth}
                supporter={voteDto.fifth}
              />
            ) : (
              <div>
                <h3>투표가 진행중입니다!</h3>
                <div className='vote-body'>
                  <img
                    src='../assets/donut_chart.png'
                    className='donut-chart'
                    id='donutChart'
                    alt='도넛차트'
                  />
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
                      disabled={vote === '' ? true : false}
                    >
                      투표하기
                    </Button>
                    <Button
                      size='small'
                      variant='outlined'
                      color='veryperi'
                      onClick={onVoteCancelButtonClicked}
                    >
                      투표철회
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
        {room.nickname === user.nickname && !voteDto ? (
          <Button
            variant='contained'
            color='veryperi'
            onClick={onVoteEndButtonClicked}
          >
            투표 종료하기
          </Button>
        ) : null}
      </div>
      <hr className='hrLine'></hr>
      <RoomComment idx={idx} />
    </div>
  );
};

export default RoomDetail;
