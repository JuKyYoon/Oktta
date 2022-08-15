import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { deleteRoom, detailRoom } from '../../services/roomService';
import { createVote, deleteVote, quitVote } from '../../services/voteService';
import { Button, Dialog, DialogContent, IconButton } from '@mui/material';
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import { useSelector } from 'react-redux';
import VoteChart from './VoteChart';
import RoomComment from './RoomComment';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { lolPosition, position } from '@/const/position';
import '@/styles/room.scss';

const RoomDetail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { idx } = useParams();
  const [room, setRoom] = useState(null);
  const [vote, setVote] = useState(0);
  const [voteDto, setVoteDto] = useState(null);
  const [currentVote, setCurrentVote] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 댓글 정보
  const [commentList, setCommentList] = useState([]);

  const getDetailRoom = async (idx) => {
    const result = await detailRoom(idx);
    if (result?.data?.message !== 'success') {
      alert('잘못된 접근입니다.');
      navigate('../list');
    }
    // 투표가 종료된 방이면 voteDto값 설정해주기
    if (result?.data?.result?.voteDto) {
      setVoteDto(result.data.result.voteDto);
    }
    // 방 정보 room에 저장
    setRoom(result?.data?.result);

    // 댓글 정보
    setCommentList(result?.data?.list);
  };

  useEffect(() => {
    getDetailRoom(idx);
  }, []);

  useEffect(() => {
    if (room !== null) {
      setCurrentVote(lolPosition[parseInt(room.myVote)]);
    }
  }, [room]);

  const onDeleteButtonClicked = async () => {
    const result = await deleteRoom(idx);
    // 200 성공이면 삭제
    if (result?.data?.message === 'success') {
      navigate('../list');
    } else if (result?.data?.message === 'fail') {
      // 200 실패이면 남의 글 삭제
      alert('잘못된 요청입니다.');
    } else {
      alert('잘못된 요청입니다.');
      // console.log(result?.response?.status);
      navigate('../list');
    }
  };

  const onVoteEndButtonClicked = async () => {
    const result = await quitVote(idx);
    if (result?.data?.message === 'success') {
      location.reload();
    } else if (result?.data?.message === 'fail') {
      alert('접근 권한이 없습니다.');
    } else {
      navigate('/error');
    }
  };

  const handleVoteChanged = (event) => {
    setVote(parseInt(event.target.value));
  };

  const onVoteButtonClicked = async () => {
    const result = await createVote(idx, vote);
    // setVote(vote);
    if (result?.data?.message === 'success') {
      setCurrentVote(lolPosition[parseInt(vote)]);
      alert('투표하였습니다.');
    } else {
      alert('투표에 실패하였습니다...');
    }
    setVote(0);
  };

  const onVoteCancelButtonClicked = async () => {
    const result = await deleteVote(idx);
    if (result?.data?.message === 'success') {
      setCurrentVote('');

      alert('투표를 철회하였습니다.');
    } else if (result?.data?.message === 'fail') {
      alert('먼저 투표를 해주세요!');
    }
    setVote(0);
  };

  return (
    <>
      {room !== null ? (
        <div className='room'>
          <h1>{room.title}</h1>
          <hr className='hrLine'></hr>
          <div className='detail-body'>
            <div className='detail-editor'>
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
            </div>
            <div className='vote-body'>
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
                  <div className='current-vote'>
                    {currentVote === ''
                      ? '투표를 진행해주세요'
                      : `현재 투표한 포지션: ${currentVote}`}
                  </div>
                  <div className='vote-component'>
                    <img
                      src='../assets/donut_chart.png'
                      className='donut-chart'
                      id='donutChart'
                      alt='도넛차트'
                    />
                    <div className='radio-button'>
                      <FormControl fullWidth>
                        <RadioGroup
                          aria-labelledby='demo-controlled-radio-buttons-group'
                          name='controlled-radio-buttons-group'
                          value={vote}
                          onChange={handleVoteChanged}
                        >
                          {position.map((el, index) => (
                            <FormControlLabel
                              key={index}
                              value={index + 1}
                              control={<Radio />}
                              label={el}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <Button
                        className='detail-button'
                        size='small'
                        variant='outlined'
                        color='veryperi'
                        onClick={onVoteButtonClicked}
                        disabled={vote >= 1 && vote <= 5 ? false : true}
                      >
                        투표하기
                      </Button>
                      <Button
                        className='detail-button'
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

          <div>
            <Link to={`../list`} style={{ textDecoration: 'none' }}>
              <Button
                className='detail-button'
                variant='outlined'
                color='veryperi'
              >
                목록으로
              </Button>
            </Link>
            {room.nickname === user.nickname ? (
              <Link
                to={`../edit/${room.idx}`}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  className='detail-button'
                  variant='outlined'
                  color='veryperi'
                >
                  수정하기
                </Button>
              </Link>
            ) : null}

            {room.nickname === user.nickname ? (
              <Button
                className='detail-button'
                variant='contained'
                color='veryperi'
                onClick={() => setShowDeleteModal(true)}
              >
                방 삭제하기
              </Button>
            ) : null}
            {room.nickname === user.nickname && !voteDto ? (
              <Button
                className='detail-button'
                variant='contained'
                color='veryperi'
                onClick={onVoteEndButtonClicked}
              >
                투표 종료하기
              </Button>
            ) : null}
          </div>
          <hr className='hrLine'></hr>
          {/* 삭제확인모달 */}
          <Dialog open={showDeleteModal}>
            <DialogContent style={{ position: 'relative' }}>
              <IconButton
                style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={() => setShowDeleteModal(false)}
              >
                <DisabledByDefaultOutlinedIcon />
              </IconButton>
              <div className='modal'>
                <div className='modal-title'> 정말 삭제하시겠습니까 ?</div>
                <div className='modal-button'>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={onDeleteButtonClicked}
                  >
                    예
                  </Button>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => {
                      setShowDeleteModal(false);
                    }}
                  >
                    아니오
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <RoomComment idx={idx} list={commentList} />
        </div>
      ) : null}{' '}
    </>
  );
};

export default RoomDetail;
