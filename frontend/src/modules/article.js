import { GET_ARTICLE } from './types.js';

const initState = {
  articles: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_ARTICLE:
      state.articles = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
}
