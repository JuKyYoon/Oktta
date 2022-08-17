import { axiosAuth, riotRequest, request } from './axios.js';

const ROOM_URL = 'api/v1/room';

const ROOM_COMMENT_URL = 'api/v1/roomComments';
const SESSION_URL = 'api/v1/session';

const LOL_URL = 'api/v1/lol';
const RIOT_MATCH = 'match/v5/matches';

// room 댓글 목록 불러오기
export const getRoomCommentList = async (idx) => {
  try {
    const payload = await axiosAuth.get(`${ROOM_URL}/comment/${idx}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// room 생성
export const createRoom = async (dataToSubmit) => {
  try {
    const payload = await axiosAuth.post(ROOM_URL, dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// room 상세보기
export const detailRoom = async (idx) => {
  try {
    const payload = await axiosAuth.get(`${ROOM_URL}/${idx}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// room 삭제
export const deleteRoom = async (idx) => {
  try {
    const payload = await axiosAuth.delete(`${ROOM_URL}/${idx}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// room 수정
export const updateRoom = async (idx, dataToSubmit) => {
  try {
    const payload = await axiosAuth.put(`${ROOM_URL}/${idx}`, dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// room 목록 조회
export const getRoomList = async (pageNum) => {
  try {
    const payload = await request.get(`${ROOM_URL}?page=${pageNum}`);
    return payload;
  } catch (err) {
    return err;
  }
};

export const createRoomComment = async (idx, dataToSubmit) => {
  try {
    const payload = await axiosAuth.post(
      `${ROOM_COMMENT_URL}/${idx}`,
      dataToSubmit
    );
    return payload;
  } catch (err) {
    return err;
  }
};

export const deleteRoomComment = async (idx) => {
  try {
    const payload = await axiosAuth.delete(`${ROOM_COMMENT_URL}/${idx}`);
    return payload;
  } catch (err) {
    return err;
  }
};

export const editRoomComment = async (idx, dataToSubmit) => {
  try {
    const payload = await axiosAuth.put(
      `${ROOM_COMMENT_URL}/${idx}`,
      dataToSubmit
    );
    return payload;
  } catch (err) {
    return err;
  }
};

// 내가 작성한 글 불러오기
export const getMyRoom = async () => {
  try {
    const payload = await axiosAuth.get(`${ROOM_URL}/mine`);
    return payload;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// 소환사명으로 최근 게임 가져오기
export const getMatchBySummoner = async (dataToSubmit, pageNum) => {
  try {
    const payload = await axiosAuth.get(
      `${LOL_URL}/match/${dataToSubmit}?page=${pageNum}`
    );
    return payload;
  } catch (err) {
    return err;
  }
};

// 라이엇 API에서 매치 상세정보 가져오기
export const getMatchDetail = async (dataToSubmit) => {
  try {
    const payload = await riotRequest.get(
      `${RIOT_MATCH}/${dataToSubmit}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`
    );
    return payload;
  } catch (err) {
    return err;
  }
};

export const roomHitRequest = async (dataToSubmit) => {
  try {
    const payload = await axiosAuth.put(`${ROOM_URL}/hit/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 온에어
export const onAirListRequest = async (dataToSubmit) => {
  try {
    const payload = await axiosAuth.get(
      `${ROOM_URL}/live?page=${dataToSubmit}`
    );
    return payload;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// 온에어 TOP3
export const onAirTopListRequest = async () => {
  try {
    const payload = await request.get(`${ROOM_URL}/top`);
    return payload;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// 녹화된 영상 불러오기
export const getRecordings = async (idx) => {
  try {
    const payload = await axiosAuth.get(`${SESSION_URL}/recording/get/${idx}`);
    return payload;
  } catch (err) {
    console.log(err);
    return err;
  }
};
