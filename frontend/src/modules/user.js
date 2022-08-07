import {
  EMAIL_AUTH,
  GET_TOKEN,
  SIGNUP,
  LOGIN,
  GOOGLE_LOGIN,
  KAKAO_LOGIN,
  NAVER_LOGIN,
  LOGOUT,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_PROFILE,
} from "../modules/types.js";

export const initState = {
  isLogin: false,
  nickname: "",
  auth: "",
  token: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case EMAIL_AUTH:
      if (action.payload.data.message === "success") {
        return {
          ...state,
          auth: "1"
        }
      }
      return { ...state }
    case GET_TOKEN:
      return { ...state };
    case SIGNUP:
      return { ...state };
    case LOGIN:
      if (action.payload.data.message === "success") {
        return {
          ...state,
          isLogin: true,
          nickname: action.payload.data.result.nickname,
          auth: action.payload.data.result.auth,
          token: action.payload.data.result.accessToken,
        };
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
    case EDIT_ACCOUNT:
      return { ...state, data: action.payload };
    case DELETE_ACCOUNT:
      return { ...state, data: action.payload };
    case UPDATE_PROFILE:
      return { ...state, userId: action.payload.userId };
    default:
      return state;
  }
}
