import {
  EMAIL_AUTH,
  LOGIN,
  SOCIAL_LOGIN,
  LOGOUT,
  DELETE_ACCOUNT,
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
      if (action.payload.data.message === "success") {
        return {
          ...state,
          auth: "1"
        }
      }
      return { ...state }
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
    case SOCIAL_LOGIN:
      console.log(action.payload)
      return {
        isLogin: action.payload.isLogin,
        nickname: action.payload.nickname,
        auth: action.payload.auth,
        token: action.payload.token,
        snsType: action.payload.snsType,
      }
    case LOGOUT:
      return initState;
    case DELETE_ACCOUNT:
      return initState;
    case UPDATE_NICKNAME:
      console.log(action.payload)
      return {
        ...state,
        nickname: action.payload.nickname,
      };
    default:
      return state;
  }
}
