import { axiosAuth } from './axios.js';

const VOTE_URL = 'api/v1/votes';

export const createVote = async (idx, position) => {
  try {
    const payload = await axiosAuth.put(
      `${VOTE_URL}/${idx}?number=${position}`
    );
    return payload;
  } catch (err) {
    return err;
  }
};

export const deleteVote = async (idx) => {
  try {
    const payload = await axiosAuth.delete(`${VOTE_URL}/${idx}`);
    return payload;
  } catch (err) {
    return err;
  }
};

export const quitVote = async (idx) => {
  try {
    const payload = await axiosAuth.put(`${VOTE_URL}/end/${idx}`);
    return payload;
  } catch (err) {
    return err;
  }
};
