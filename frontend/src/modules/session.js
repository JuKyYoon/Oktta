import { GET_SESSION } from '../modules/type.js';

const initState = {
  sessions: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_SESSION:
      state.sessions = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
}
