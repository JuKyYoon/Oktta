import { axiosAuth } from './axios.js';

const VOTE_URL = 'api/v1/votes';

export const createVote = async (idx, position) => {
  const payload = await axiosAuth.put(`${VOTE_URL}/${idx}?number=${position}`);
  return payload;
};

export const deleteVote = async (idx) => {
  const payload = await axiosAuth.delete(`${VOTE_URL}/${idx}`);
  return payload;
};

export const quitVote = async (idx) => {
  const payload = await axiosAuth.put(`${VOTE_URL}/end/${idx}`);
  return payload;
};
