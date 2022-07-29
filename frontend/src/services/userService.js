import { request, axiosAuth } from "./axios";
import { GET_TOKEN, SIGNUP, LOGIN, GOOGLE_LOGIN, KAKAO_LOGIN, NAVER_LOGIN, LOGOUT, CHECK_EMAIL, CHECK_NICKNAME, PW_INQUIRY, EDIT_ACCOUNT, DELETE_ACCOUNT } from "../modules/types.js";
import { store } from "..";

/* 요청 URL */
const USER_URL = "/api/v1/user";
const AUTH_URL = "/api/v1/auth";

// 토큰 재발급
export const getToken = () => {
  const userId = store.getState().user.userId;
  const data = request.get(`${AUTH_URL}/refresh/${userId}`);
  return {
    type: GET_TOKEN,
    payload: data,
  };
};

// 회원가입
export const signupRequest = (dataToSubmit) => {
  const data = request.post(USER_URL, dataToSubmit);
  return {
    type: SIGNUP,
    payload: data,
  }
};

// 로그인
export const loginRequest = (dataToSubmit) => {
  const data = request.post(`${AUTH_URL}/authorize`, dataToSubmit)
  return {
    type: LOGIN,
    payload: data,
  }
};

// 소셜 로그인
export const googleLoginRequest = (dataToSubmit) => {
  const data = axiosAuth.post(`${AUTH_URL}/authorize/google`, dataToSubmit);
  return {
    type: GOOGLE_LOGIN,
    payload: data,
  };
};

export const kakaoLoginRequest = (dataToSubmit) => {
  const data = axiosAuth.post(`${AUTH_URL}/authorize/kakao`, dataToSubmit);
  return {
    type: KAKAO_LOGIN,
    payload: data,
  };
};

export const naverLoginRequest = (dataToSubmit) => {
  const data = axiosAuth.post(`${AUTH_URL}/authorize/naver`, dataToSubmit);
  return {
    type: NAVER_LOGIN,
    payload: data,
  };
};

// 로그아웃
export const logoutRequest = () => {
  const data = axiosAuth.delete(`${AUTH_URL}/logout`);
  return {
    type: LOGOUT,
    payload: data,
  };
};

// 이메일이 중복이면 fail, 이메일이 중복이 아니면 success
export const checkEmailRequest = (dataToSubmit) => {
  const data = axiosAuth.get(`${USER_URL}/id/${dataToSubmit}`);
  return {
    type: CHECK_EMAIL,
    payload: data,
  };
};

// 닉네임이 중복이면 fail, 닉네임이 중복이 아니면 success
export const checkNicknameRequest = (dataToSubmit) => {
  const data = axiosAuth.get(`${USER_URL}/name/${dataToSubmit}`);
  return {
    type: CHECK_NICKNAME,
    payload: data,
  };
};

// 비밀번호 수정
export const pwInquiry = (dataToSubmit) => {
  const data = axiosAuth.patch(`${USER_URL}/password/${dataToSubmit}`);
  return {
    type: PW_INQUIRY,
    payload: data,
  };
};

// 회원 정보 수정
export const editAccount = (dataToSubmit) => {
  const data = axiosAuth.put(USER_URL, dataToSubmit);
  return {
    type: EDIT_ACCOUNT,
    payload: data,
  };
};

// 회원 탈퇴
export const delAccount = (dataToSubmit) => {
  const data = axiosAuth.delete(USER_URL, dataToSubmit);
  return {
    type: DELETE_ACCOUNT,
    payload: data,
  };
};