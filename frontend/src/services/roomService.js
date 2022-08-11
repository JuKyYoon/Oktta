import { axiosAuth } from './axios.js';

const ROOM_URL = 'api/v1/room';
const ROOM_COMMENT_URL = 'api/v1/roomComments';

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
    const payload = await axiosAuth.get(`${ROOM_URL}?page=${pageNum}`);
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
