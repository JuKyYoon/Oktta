import { GET_ARTICLE, CREATE_ARTICLE, UPDATE_ARTICLE } from './types.js';

const initState = {
  articles: null,
};

// 리듀서
export default function (state = initState, action) {
  switch (action.type) {
    case GET_ARTICLE:
      state.articles = action.payload;
      return { ...state };
    case CREATE_ARTICLE:
      return { ...state };
    case UPDATE_ARTICLE:
      return { ...state };
    default:
      return { ...state };
  }
}
