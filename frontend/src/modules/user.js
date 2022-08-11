import {
  EMAIL_AUTH,
  SET_TOKEN,
  LOGIN,
  SOCIAL_LOGIN,
  LOGOUT,
  UPDATE_NICKNAME
} from "../modules/types.js";

export const initState = {
  isLogin: false,
  nickname: "",
  auth: "",
  token: "",
  snsType: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case EMAIL_AUTH:
      return {
        ...state,
        auth: "1"
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.accessToken,
      }
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        nickname: action.payload.data.result.nickname,
        auth: action.payload.data.result.auth,
        token: action.payload.data.result.accessToken,
      }
    case SOCIAL_LOGIN:
      return {
        isLogin: action.payload.isLogin,
        nickname: action.payload.nickname,
        auth: action.payload.auth,
        token: action.payload.token,
        snsType: action.payload.snsType,
      }
    case LOGOUT:
      return initState;
    case UPDATE_NICKNAME:
      return {
        ...state,
        nickname: action.payload.nickname,
      };
    default:
      return state;
  }
}
