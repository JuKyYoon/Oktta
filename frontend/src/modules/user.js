import {
  EMAIL_AUTH,
  LOGIN,
  LOGOUT,
  DELETE_ACCOUNT,
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
    case LOGOUT:
      return initState;
    case DELETE_ACCOUNT:
      return initState;
    default:
      return state;
  }
}
