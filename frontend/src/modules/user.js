import { GET_TOKEN, SIGNUP, LOGIN, GOOGLE_LOGIN, KAKAO_LOGIN, NAVER_LOGIN, LOGOUT, CHECK_EMAIL, CHECK_NICKNAME, PW_INQUIRY, EDIT_ACCOUNT, DELETE_ACCOUNT } from "../modules/types.js";

const initState = {
  isLogin: false,
  userId: "",
  token: "",
}

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TOKEN:
      return { ...state };
    case SIGNUP:
      return { ...state };
    case LOGIN:
      if (action.payload.data.message === "success") {
        return { ...state, isLogin: true, userId: action.payload.data.result.userId, token: action.payload.data.result.accessToken };
      }
      return { ...state };
    case GOOGLE_LOGIN:
      return { ...state, data: action.payload };
    case KAKAO_LOGIN:
      return { ...state, data: action.payload };
    case NAVER_LOGIN:
      return { ...state, data: action.payload };
    case LOGOUT:
      return initState;
    case CHECK_EMAIL:
      return { ...state, data: action.payload };
    case CHECK_NICKNAME:
      return { ...state, data: action.payload };
    case PW_INQUIRY:
      return { ...state, data: action.payload };
    case EDIT_ACCOUNT:
      return { ...state, data: action.payload };
    case DELETE_ACCOUNT:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
