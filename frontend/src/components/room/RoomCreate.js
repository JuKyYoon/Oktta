import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Box,
  Modal,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router';
import {
  createRoom,
  getMatchBySummoner,
  getMatchDetail,
} from '@/services/roomService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@/util/build/ckeditor';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import '@/styles/room.scss';
import Loading from '../layout/Loading';
import { positionKorean } from '@/const/lolKorean';


const RoomCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const onTitleChanged = (event) => {
    setTitle(event.target.value);
  };

  // 게임 정보 불러오기 관련
  const [open, setOpen] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [summonerName, setSummonerName] = useState('');
  const [summonerNameSearch, setSummonerNameSearch] = useState('');
  const [matchList, setMatchList] = useState([]);
  const [matchListView, setMatchListView] = useState([]);
  const [searchState, setSearchState] = useState('before');
  const [matchSelected, setMatchSelected] = useState({});
  const [matchSelectedDetail, setMatchSelectedDetail] = useState(false);
  const [matchForSubmit, setMatchForSubmit] = useState(false);
  const [emphasize, setEmphasize] = useState(false);
  const [hostSummonerName, setHostSummonerName] = useState('');
  const [hostTeamId, setHostTeamId] = useState('');


  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    // 검색 내역 초기화
    setPageNum(0);
    setMatchList([]);
    setMatchListView([]);
    setSearchState('before');
    setMatchSelected('');
    setOpen(false);
    setSummonerNameSearch('');
  };

  const handleSelect = () => {
    setMatchSelectedDetail(
      matchListView.find((match) => matchSelected === match.matchId)
    );
    const matchRawData = matchList.find(
      (match) => matchSelected === match.metadata.matchId
    );
    if (matchRawData) {
      // 전송하기 위한 데이터 가공
      const participants = matchRawData.info.participants.map(
        (participant) => ({
          participantId: participant.participantId,
          teamId: participant.teamId,
          summonerId: participant.summonerId,
          summonerName: participant.summonerName,
          teamPosition: participant.teamPosition,
          championId: participant.championId,
          championName: participant.championName,
          kills: participant.kills,
          assists: participant.assists,
          deaths: participant.deaths,
          puuid: participant.puuid,
          win: participant.win,
        })
      );

      const matchForSubmit = {
        matchId: matchRawData.metadata.matchId,
        queueId: matchRawData.info.queueId,
        mapId: matchRawData.info.mapId,
        gameMode: matchRawData.info.gameMode,
        gameStartTimestamp: matchRawData.info.gameStartTimestamp,
        gameEndTimestamp: matchRawData.info.gameEndTimestamp,
        participants,
      };
      setMatchForSubmit(matchForSubmit);

      // 호스트 소환사명 및 팀 세팅 (검색한 소환사명 기준)
      const hostSummoner = matchRawData.info.participants.find(
        (participant) => participant.summonerName.toLowerCase().replace(/ /g, "") === summonerName.toLowerCase().replace(/ /g, "")
      );
      setHostSummonerName(hostSummoner.summonerName);
      setHostTeamId(hostSummoner.teamId);
    }
    // 검색 내역 초기화
    setPageNum(0);
    setMatchList([]);
    setMatchListView([]);
    setSearchState('before');
    setMatchSelected({});
    setSummonerNameSearch('');
    setOpen(false);
  };

  const handleTeamChanged = (event) => {
    setHostTeamId(parseInt(event.target.value));
  };


  const onSearchSubmit = async (event) => {
    event.preventDefault();
    setSummonerNameSearch(summonerName);
    const result = await getMatches(summonerName, pageNum);
    setSearchState(result);
  };

  const getMatches = async (summonerName, pageNum) => {
    if (!summonerName) {
      return;
    }

    setSearchState('pending');
    const result = await getMatchBySummoner(summonerName, pageNum);
    let matchData;

    if (result?.data?.message === 'success') {
      matchData = result.data.matchList;
    } else if (result?.data?.message === 'fail') {
      matchData = [];
    } else if (result?.response?.status === 404) {
      return 'fail';
    } else {
      alert('잘못된 접근입니다.');
      return 'fail';
    }
    const matchList = [];
    for (let matchId of matchData) {
      const { data } = await getMatchDetail(matchId);
      if (data == undefined) {
        return 'error'
      }
      matchList.push(data);
    };


    if (matchList.length > 0) {
      setMatchList(matchList);
      const matchListView = matchList.map((match) => {
        const matchId = match.metadata.matchId;
        const target = match.info.participants.find(
          (participant) =>
            participant.summonerName.toLowerCase().replace(/ /g, '') ===
            summonerName.toLowerCase().replace(/ /g, '')
        );
        const matchResult = target.win ? '승리' : '패배';
        const championTarget = target.championName;
        const kda = `${target.kills} / ${target.deaths} / ${target.assists}`;
        const position = target.teamPosition
          ? positionKorean[target.teamPosition]
          : '칼바람';

        const championTeam1 = match.info.participants
          .filter((participant) => participant.teamId === 100)
          .map((participant) => participant.championName);

        const championTeam2 = match.info.participants
          .filter((participant) => participant.teamId === 200)
          .map((participant) => participant.championName);

        const fromNow = Math.round(
          (Date.now() - match.info.gameEndTimestamp) / 1000 / 60 / 60
        );
        const endTime =
          fromNow < 24
            ? `${fromNow} 시간 전`
            : `${Math.round(fromNow / 24)} 일 전`;

        return {
          matchId,
          matchResult,
          championTarget,
          kda,
          championTeam1,
          championTeam2,
          position,
          endTime,
        };
      });
      setMatchListView(() => matchListView);
      return 'done';
    } else {
      return 'fail';
    }
  };

  const onSummonerNameChanged = (event) => {
    setSummonerName(event.target.value);
  };

  const onHandlePage = async (event) => {
    const newPageNum = pageNum + parseInt(event.target.value);
    if (newPageNum >= 0) {
      setPageNum(newPageNum);
      setMatchSelected({});
      const result = await getMatches(summonerNameSearch, newPageNum);
      setSearchState(result);
    }
  };
  // 게임 정보 --------------

  const onSubmitClicked = async (event) => {
    event.preventDefault();
    if (!matchForSubmit) {
      setEmphasize(true);
      return;
    };

    const body = {
      title: title.trim(),
      content: content.trim(),
      hostSummonerName: hostSummonerName.trim(),
      hostTeamId,
      matchDto: matchForSubmit,
    };

    const result = await createRoom(body);
    if (result?.data?.message === 'success') {
      navigate(`/room/${result.data.result}`);
    } else if (result?.response?.status === 400) {
      alert('게임을 선택해 주세요.');
    } else if (result?.response?.status === 403) {
      console.log('노토큰입니다.화이팅');
    } else {
      alert('옥상 생성에 실패하였습니다. 옥상 목록으로 이동합니다.');
      navigate('/room/list');
    }
  };

  const isValid = title.trim().length >= 2 && title.trim().length < 50 && content.trim().length >= 2;

  return (
    <div className='room'>
      <h2>게시글 등록</h2>
      <span>갈등상황을 해결해봅시다!</span>
      <span>갈등상황에 대해 제목과 간략한 설명을 적어주세요!</span>
      <hr className='hrLine'></hr>
      <div className='room-head-container'>
        <div className='room-title-container'>
          <div className='room-title-form'>
            <FormControl sx={{ width: "90%" }}>
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
          <Button sx={{ mb: "15px" }} variant='contained' color='veryperi' onClick={handleOpen}>{matchSelectedDetail ? '다시' : '게임'} 불러오기</Button>
        </div>
        {/* 게임 불러오기 부분 */}
        <div className='room-get-match'>
          {matchSelectedDetail ? (
            <div className='create-room-selected-box'>
              <div
                className={`create-room-selected ${matchSelectedDetail.matchResult === '승리' ? 'win' : 'lose'
                  }`}>
                <img
                  src={`/assets/champion/${matchSelectedDetail.championTarget}.png`}
                  className='create-room-champion-image'
                />
                <div>
                  <p>{summonerName}</p>
                  <p>{matchSelectedDetail.kda}</p>
                </div>
              </div>

              <div className="team-select-box">
                <div className="team-select-box-top">
                  <h4>팀 선택</h4>
                </div>
                <div className="team-select-box-bottom">
                  <FormControl sx={{ width: "50px", margin: "0" }}>
                    <RadioGroup
                      defaultValue={hostTeamId}
                      className="team-select-radio-group"
                      value={hostTeamId}
                      onChange={handleTeamChanged}>
                      <FormControlLabel value="100" control={<Radio />}
                        sx={{ margin: 0, justifyContent: "center" }} />
                      <FormControlLabel value="200" control={<Radio color="red" />}
                        sx={{ margin: 0, justifyContent: "center" }} />
                    </RadioGroup>
                  </FormControl>
                  <div>
                    <span className='result-champion-all'>
                      <div className='result-champion-team'>
                        {matchSelectedDetail.championTeam1.map((champion, idx) => (
                          <img
                            key={idx}
                            src={`/assets/champion/${champion}.png`}
                            className='team-select-champion-img'
                            width={35}
                            height={35}
                          />
                        ))}
                      </div>
                      <div className='result-champion-team'>
                        {matchSelectedDetail.championTeam2.map((champion, idx) => (
                          <img
                            key={idx}
                            src={`/assets/champion/${champion}.png`}
                            className='team-select-champion-img'
                            width={35}
                            height={35}
                          />
                        ))}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='create-room-no-selected-box'>
              <p>게임을 선택해 주세요.</p>
              <p className='create-room-notice'>{emphasize ? '필수 항목입니다.' : null}</p>
            </div>
          )}
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className='modal-box'>
          <form onSubmit={onSearchSubmit} className='modal-search-form'>
            <TextField
              id='summonerName'
              label='소환사명'
              variant='standard'
              color='veryperi'
              type='text'
              value={summonerName}
              onChange={onSummonerNameChanged}
            />
            <Button
              variant='contained'
              color='veryperi'
              type='submit'
              disabled={!summonerName}
            >
              검색
            </Button>
          </form>
          <div className='modal-result-div'>
            {searchState == 'before' ? (
              <p>소환사명을 검색해 최근 전적을 불러올 수 있습니다.</p>
            ) : searchState == 'pending' ? (
              <Loading />
            ) : searchState == 'fail' ? (
              <p>소환사를 찾을 수 없습니다. 다시 검색해 주세요.</p>
            ) : searchState == 'error' ? (
              <p>데이터를 가져오는 중 오류가 발생했습니다.</p>
            ) : (
              <div className='modal-result-list'>
                {matchListView.map((match, idx) => (
                  <div
                    key={idx}
                    className={`${match.matchId === matchSelected
                      ? 'modal-result-item-selected'
                      : null
                      }
                            ${match.matchResult === '승리' ? 'win' : 'lose'}
                            modal-result-item`}
                    onClick={() => setMatchSelected(match.matchId)}
                  >
                    <span>{match.matchResult}</span>
                    <img
                      src={`/assets/champion/${match.championTarget}.png`}
                      className='result-champion-target'
                    />
                    <span className='result-kda-span'>{match.kda}</span>
                    <span className='result-champion-all'>
                      <div className='result-champion-team'>
                        {match.championTeam1.map((champion, idx) => (
                          <img
                            key={idx}
                            src={`/assets/champion/${champion}.png`}
                            className='result-champion-one'
                          />
                        ))}
                      </div>
                      <div className='result-champion-team'>
                        {match.championTeam2.map((champion, idx) => (
                          <img
                            key={idx}
                            src={`/assets/champion/${champion}.png`}
                            className='result-champion-one'
                          />
                        ))}
                      </div>
                    </span>
                    <span className='result-position-span'>
                      {match.position}
                    </span>
                    <span className='result-time-span'>{match.endTime}</span>
                  </div>
                ))}
                <div className='result-pagenation'>
                  <Button
                    value='-1'
                    color='veryperi'
                    variant='outlined'
                    onClick={onHandlePage}
                    disabled={pageNum === 0}
                  >
                    이전 10개
                  </Button>
                  <Button
                    value='1'
                    color='veryperi'
                    variant='outlined'
                    onClick={onHandlePage}
                    disabled={matchList.length < 10}
                  >
                    다음 10개
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className='modal-button-div'>
            <Button
              onClick={handleSelect}
              disabled={matchSelected.length === 0}
            >
              선택
            </Button>
            <Button onClick={handleClose}>닫기</Button>
          </div>
        </Box>
      </Modal>
      {/* 게임 정보 -------------- */}

      <div className='room-editor'>
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
        className='room-button'
        variant='outlined'
        color='veryperi'
        onClick={onSubmitClicked}
        disabled={!isValid || !matchForSubmit}
      >
        등록하기
      </Button>
    </div>
  );
};

export default RoomCreate;
