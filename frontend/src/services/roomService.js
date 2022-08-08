import {
  GET_ROOM_LIST,
  GET_ROOM,
  CREATE_ROOM,
  UPDATE_ROOM,
  DETAIL_ROOM,
  DELETE_ROOM,
} from '../modules/types.js';

import { axiosAuth, request } from './axios.js';

const ROOM_URL = 'api/v1/room';

// 액션 생성함수
export const getRoomList = async (dataToSubmit) => {
  const payload = await axiosAuth.get(`${ROOM_URL}?page=${dataToSubmit}`);

  return {
    type: GET_ROOM_LIST,
    payload,
  };
};

export const createRoom = async (dataToSubmit) => {
  const payload = await axiosAuth.post(ROOM_URL, dataToSubmit);
  return {
    type: CREATE_ROOM,
    payload,
  };
};

export const updateRoom = async (dataToSubmit) => {
  const payload = await axiosAuth.put(
    `${ROOM_URL}/${dataToSubmit.roomId}`,
    dataToSubmit.body
  );
  return {
    type: UPDATE_ROOM,
    payload,
  };
};
export const detailRoom = async (dataToSubmit) => {
  const payload = await axiosAuth.get(`${ROOM_URL}/${dataToSubmit}`);
  return {
    type: DETAIL_ROOM,
    payload,
  };
};

export const deleteRoom = async (dataToSubmit) => {
  const payload = await axiosAuth.delete(`${ROOM_URL}/${dataToSubmit}`);
  return {
    type: DELETE_ROOM,
    payload,
  };
};
