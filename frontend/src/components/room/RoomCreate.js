import React, { useState } from 'react';
import { Box, Button, Modal, TextField, PaginationItem } from '@mui/material';
import { useNavigate } from 'react-router';
import { createRoom, getMatchBySummoner, getMatchDetail } from '../../services/roomService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '../../styles/room.scss';
import Loading from '../layout/Loading';

const positionKr = {
  'TOP': '탑',
  'JUNGLE': '정글',
  'MIDDLE': '미드',
  'BOTTOM': '원딜',
  'UTILITY': '서폿',
}

const RoomCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  // 게임 정보 불러오기 관련
  const [open, setOpen] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [summonerName, setSummonerName] = useState('');
  const [matchList, setMatchList] = useState([]);
  const [matchListView, setMatchListView] = useState([]);
  const [searchState, setSearchState] = useState('before');
  const [matchSelected, setMatchSelected] = useState({});
  const [matchForSubmit, setMatchForSubmit] = useState({});

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    // 검색 내역 초기화
    setSummonerName('');
    setMatchList([]);
    setMatchListView([]);
    setSearchState('before');
    setMatchSelected('');
    setOpen(false);
  };

  const handleSelect = () => {
    const match = matchList.filter((match) => matchSelected === match.metadata.matchId)[0];
    setMatchForSubmit(match[0])

    // 검색 내역 초기화
    setSummonerName('');
    setMatchList([]);
    setMatchListView([]);
    setSearchState('before');
    setMatchSelected('');
    setOpen(false)
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    getMatches()
    .then((result) => setSearchState(result));
  };

  const getMatches = async () => {
    if (!summonerName) {
      return;
    };
    setSearchState('pending');
    const data = await getMatchBySummoner(summonerName, pageNum)
      .then((res) => {
        setSearchState('finish')
        if (res.data.message === 'success') {
          return res.data.matchList;
        } else {
          return []
        };
      })
      .catch((err) => {
        return (err.response.status === 404) ? setSearchState('fail') : alert('잘못된 접근입니다.')
      });

    console.log(data)

    const matchList = []
    for (let matchId of data) {
      const res = await getMatchDetail(matchId)
        .catch((err) => console.log(err));
      matchList.push(res);
    };
    if (matchList.length) {
      setMatchList(matchList);
      const matchListView = matchList.map((match) => {
        console.log(match)
        const matchId = match.metadata.matchId;

        const target = match.info.participants
          .filter((participant) => participant.summonerName.toLowerCase() === summonerName.toLowerCase())[0];
        const matchResult = target.win ? '승' : '패';
        const championTarget = target.championName;
        const kda = `${target.kills} / ${target.deaths} / ${target.assists}`;
        const position = target.teamPosition ? positionKr[target.teamPosition] : '칼바람';

        const championTeam1 = match.info.participants
          .filter((participant) => participant.teamId === 100)
          .map((participant) => participant.championName)

        const championTeam2 = match.info.participants
          .filter((participant) => participant.teamId === 200)
          .map((participant) => participant.championName)

        const fromNow = Math.round((Date.now() - match.info.gameEndTimestamp) / 1000 / 60 / 60)
        const endTime = fromNow < 24 ? `${fromNow} 시간 전` : `${Math.round(fromNow / 24)} 일 전`

        return {
          matchId,
          matchResult,
          championTarget,
          kda,
          championTeam1,
          championTeam2,
          position,
          endTime,
        }
      })
      setMatchListView(() => matchListView);
      return 'done';
    } else {
      return 'fail';
    };
  };

  const onSummonerNameChanged = (e) => {
    setSummonerName(e.target.value)
  };

  const onHandlePrev = () => {
    setPageNum(pageNum-1);
    getMatches()
    .then((result) => setSearchState(result));
  };
  
  const onHandleNext = () => {
    setPageNum(pageNum+1);
    getMatches()
    .then((result) => setSearchState(result));
  };
  // ---------------------

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const onSubmitClicked = (e) => {
    e.preventDefault();
    const body = {
      title,
      content,
      matchDto: matchList[0],
    };

    createRoom(body)
      .then((res) => {
        if (res.data.message === 'success') {
          navigate(`/room/${res.data.result}`);
        }
      })
      .catch((err) => console.log(err));
  };

  const isValid = Boolean(title) && Boolean(content);

  return (
    <div className='room'>
      <h2>게시글 등록</h2>
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
      {/* ################## 게임 불러오기 부분 ################## */}
      <Button onClick={handleOpen}>게임 불러오기</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-box">
          <form onSubmit={onSearchSubmit} className="modal-search-form">
            <TextField
              id="summonerName"
              label="소환사명"
              variant="standard"
              color="veryperi"
              type="text"
              value={summonerName}
              onChange={onSummonerNameChanged}
            />
            <Button
              variant="contained"
              color="veryperi"
              type="submit"
              disabled={!summonerName}
            >
              검색
            </Button>
          </form>
          <div className="modal-result-div">
            {
              (searchState == 'before')
                ? <p>소환사명을 검색해 최근 전적을 불러올 수 있습니다.</p>
                : (searchState == 'pending')
                  ? <Loading />
                  : (searchState == 'fail')
                    ? <p>소환사를 찾을 수 없습니다. 다시 검색해 주세요.</p>
                    : <div className="modal-result-list">
                      {matchListView.map((match, idx) =>
                        <div
                          key={idx}
                          className={
                            `${match.matchId === matchSelected ? "modal-result-item-selected" : null}
                            ${match.matchResult === '승' ? "modal-result-item-win" : "modal-result-item-loss"}
                            modal-result-item`
                          }
                          onClick={() => setMatchSelected(match.matchId)}
                        >
                          <span>{match.matchResult}</span>
                          <img src={`/assets/champion/${match.championTarget}.png`} className="result-champion-target" />
                          <span className="result-kda-span">{match.kda}</span>
                          <span className="result-champion-all">
                            <div className="result-champion-team">
                              {
                                match.championTeam1.map((champion, idx) =>
                                  <img key={idx} src={`/assets/champion/${champion}.png`} className="result-champion-one" />
                                )
                              }
                            </div>
                            <div className="result-champion-team">
                              {
                                match.championTeam2.map((champion, idx) =>
                                  <img key={idx} src={`/assets/champion/${champion}.png`} className="result-champion-one" />
                                )
                              }
                            </div>
                          </span>
                          <span className="result-position-span">{match.position}</span>
                          <span className="result-time-span">{match.endTime}</span>
                        </div>
                      )}
                      <div className="result-pagenation">
                        <PaginationItem
                          type="previous"
                          shape="rounded"
                          variant="outlined"
                          onClick={onHandlePrev}
                          disabled={pageNum === 0}
                        />
                        <PaginationItem
                          type="next"
                          shape="rounded"
                          variant="outlined"
                          onClick={onHandleNext}
                          disabled={matchList.length < 10}
                        />
                      </div>
                    </div>
            }
          </div>
          <div className="modal-button-div">
            <Button onClick={handleSelect}>선택</Button>
            <Button onClick={handleClose}>닫기</Button>
          </div>
        </Box>
      </Modal>
      {/* ###################################################### */}

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
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
        />
      </div>

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

export default RoomCreate;
