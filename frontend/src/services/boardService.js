import { axiosAuth, riotRequest } from './axios.js';

const BOARD_URL = 'api/v1/boards';

const BOARD_COMMENT_URL = 'api/v1/boardComments';

// const LOL_URL = 'api/v1/lol';
// const RIOT_MATCH = 'match/v5/matches';

// board 목록 조회
export const getBoardList = async (pageNum) => {
  try {
    const payload = await axiosAuth.get(
      `${BOARD_URL}?category=0&page=${pageNum}`
    );
    return payload;
  } catch (err) {
    return err;
  }
};

// board 게시글 조회수 증가
export const boardHitRequest = async (idx) => {
  try {
    const payload = await axiosAuth.put(`${BOARD_URL}/hit/${idx}`);
    return payload;
  } catch (err) { return payload;
  }
};

// board 게시글 작성
export const createBoard = async (dataToSubmit) => {
  try {
    const payload = await axiosAuth.post(BOARD_URL, dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// board 상세보기
export const detailBoard = async (idx) => {
  try {
    const payload = await axiosAuth.get(`${BOARD_URL}/${idx}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// board 삭제
export const deleteBoard = async (idx) => {
  try {
    const payload = await axiosAuth.delete(`${BOARD_URL}/${idx}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// board 수정
export const updateBoard = async (idx, dataToSubmit) => {
  try {
    const payload = await axiosAuth.put(`${BOARD_URL}/${idx}`, dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// // board 댓글 목록 불러오기 (현재 api 없음) => detailBoard에 해당 게시글 댓글 정보가 같이 넘어오는 구조임
// export const getBoardCommentList = async (idx) => {
//   try {
//     const payload = await axiosAuth.get(`${BOARD_URL}/comment/${idx}`);
//     return payload;
//   } catch (err) {
//     return err;
//   }
// };

// 자유게시판 댓글 생성
export const createBoardComment = async (idx, dataToSubmit) => {
  try {
    const payload = await axiosAuth.post(
      `${BOARD_COMMENT_URL}/${idx}`,
      dataToSubmit
    );
    return payload;
  } catch (err) {
    return err;
  }
};

// 자유게시판 댓글 수정
export const editBoardComment = async (idx, dataToSubmit) => {
  try {
    const payload = await axiosAuth.put(
      `${BOARD_COMMENT_URL}/${idx}`,
      dataToSubmit
    );
    return payload;
  } catch (err) {
    return err;
  }
};

// 자유게시판 댓글 삭제
export const deleteBoardComment = async (idx) => {
  try {
    const payload = await axiosAuth.delete(`${BOARD_COMMENT_URL}/${idx}`);
    return payload;
  } catch (err) {
    return err;
  }
};

/////////////////////////////////////////////////////////////////////

// 내가 작성한 글 불러오기
export const getMyBoard = async () => {
  try {
    const payload = await axiosAuth.get(`${BOARD_URL}/mine`);
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
