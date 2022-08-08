import { request, axiosAuth } from "./axios";
import {
  EMAIL_AUTH,
  LOGIN,
  LOGOUT,
  DELETE_ACCOUNT,
} from "../modules/types.js";

/* 요청 URL*/
export const USER_URL = "/api/v1/user";
export const AUTH_URL = "/api/v1/auth";

// 토큰 재발급
export const getToken = async () => {
  return await request.get(`${AUTH_URL}/refresh`);
};

// 이메일 인증 재전송
export const sendEmail = async () => {
  return await axiosAuth.get(`${USER_URL}/reauth`);
};

// 이메일 인증 성공/실패 여부
export const emailAuth = async (dataToSubmit) => {
  const data = await request.get(`${USER_URL}/auth/${dataToSubmit}`);
  // if (data.statusCode === 200) {
  return {
    type: EMAIL_AUTH,
    payload: data,
  };
  // }
};

// 닉네임 변경
export const updateNicknameRequest = async (dataToSubmit) => {
  const res = await axiosAuth.put(USER_URL, dataToSubmit);
  const data = { ...res, nickname: dataToSubmit.nickname };
  return {
    type: UPDATE_PROFILE,
    payload: data,
  };
};

// 비밀번호 변경 -- 500
export const updatePasswordRequest = async (dataToSubmit) => {
  return await axiosAuth.patch(`${USER_URL}/password`, dataToSubmit);
};

// 회원가입
export const signupRequest = async (dataToSubmit) => {
  return await request.post(USER_URL, dataToSubmit);
};

// 로그인
export const loginRequest = async (dataToSubmit) => {
  const data = await request.post(`${AUTH_URL}`, dataToSubmit);
  return {
    type: LOGIN,
    payload: data,
  };
};

// 로그아웃
export const logoutRequest = async () => {
  try {
    const data = await axiosAuth.delete(`${AUTH_URL}`);
    return {
      type: LOGOUT,
      payload: data,
    };
  } catch (error) {
    console.log(error)
  }
};

// 이메일이 중복이면 fail, 이메일이 중복이 아니면 success
export const checkEmailRequest = async (dataToSubmit) => {
  return await request.get(`${USER_URL}/id/${dataToSubmit}`);
};

// 닉네임이 중복이면 fail, 닉네임이 중복이 아니면 success
export const checkNicknameRequest = async (dataToSubmit) => {
  return await request.get(`${USER_URL}/name/${dataToSubmit}`);
};

// 회원 탈퇴
export const delAccount = async (dataToSubmit) => {
  const data = await axiosAuth.delete(USER_URL, dataToSubmit);
  return {
    type: DELETE_ACCOUNT,
    payload: data,
  };
};
