import { axiosAuth } from './axios.js';

const ROOM_URL = 'api/v1/room';

// room 생성
export const createRoom = async (dataToSubmit) => {
  const payload = await axiosAuth.post(ROOM_URL, dataToSubmit);
  return payload;
};

// room 상세보기
export const detailRoom = async (idx) => {
  const payload = await axiosAuth.get(`${ROOM_URL}/${idx}`);
  return payload;
};

// room 삭제
export const deleteRoom = async (idx) => {
  const payload = await axiosAuth.delete(`${ROOM_URL}/${idx}`);
  return payload;
};

// room 수정
export const updateRoom = async (idx, dataToSubmit) => {
  const payload = await axiosAuth.put(`${ROOM_URL}/${idx}`, dataToSubmit);
  return payload;
};

// room 목록 조회
export const getRoomList = async (pageNum) => {
  const payload = await axiosAuth.get(`${ROOM_URL}?page=${pageNum}`);
  return payload;
};

// 내가 작성한 글 불러오기
export const getMyRoom = async () => {
  const payload = await axiosAuth.get(`${ROOM_URL}/mine`);
  return payload;
};
