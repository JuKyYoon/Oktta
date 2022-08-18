import { tierReAuth } from "@/services/userService.js";
import {
  EMAIL_AUTH,
  SET_TOKEN,
  LOGIN,
  SOCIAL_LOGIN,
  LOGOUT,
  UPDATE_NICKNAME,
  TOKEN_DELETE,
  TIER_REAUTH
} from "../modules/types.js";

export const initState = {
  isLogin: false,
  nickname: "",
  auth: "",
  token: "",
  snsType: "",
  tier: "",
  summonerName: ""
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
        tier: action.payload.data.result.tier,
        summonerName: action.payload.data.result.summonerName,
      }
    case SOCIAL_LOGIN:
      return {
        isLogin: action.payload.isLogin,
        nickname: action.payload.nickname,
        auth: action.payload.auth,
        token: action.payload.token,
        snsType: action.payload.snsType,
        tier: action.payload.tier,
        summonerName: action.payload.summonerName,
      }
    case LOGOUT:
      // return initState;
      return {
        ...state,
        isLogin: false,
        nickname: "",
        auth: "",
        snsType: "",
      }
    case UPDATE_NICKNAME:
      return {
        ...state,
        nickname: action.payload.nickname,
      };
    case TOKEN_DELETE:
      return initState;    
    case TIER_REAUTH:
      return {
        ...state,
        tier: action.payload.data.result.tier,
        summonerName: action.payload.data.result.summonerName,
      }
    default:
      return state;
  }
}
