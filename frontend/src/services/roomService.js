import axios from 'axios';
import { axiosAuth, riotRequest } from './axios.js';

const ROOM_URL = 'api/v1/room';
const LOL_URL = 'api/v1/lol';
const RIOT_MATCH = 'match/v5/matches'

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

// 소환사명으로 최근 게임 가져오기
export const getMatchBySummoner = async (dataToSubmit, pageNum) => {
  const payload = await axiosAuth.get(`${LOL_URL}/match/${dataToSubmit}?page=${pageNum}`);
  return payload;
};

// 라이엇 API에서 매치 상세정보 가져오기
export const getMatchDetail = async (dataToSubmit) => {
  const payload = await riotRequest.get(`${RIOT_MATCH}/${dataToSubmit}?api_key=${process.env.REACT_APP_RIOT_API_KEY}`);
  return payload.data;
};
