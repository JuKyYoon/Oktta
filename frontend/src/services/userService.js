import { request, axiosAuth } from "./axios";
import {
  GET_TOKEN,
  SIGNUP,
  LOGIN,
  GOOGLE_LOGIN,
  KAKAO_LOGIN,
  NAVER_LOGIN,
  LOGOUT,
  CHECK_EMAIL,
  CHECK_NICKNAME,
  PW_INQUIRY,
  EDIT_ACCOUNT,
  DELETE_ACCOUNT,
} from "../modules/types.js";
import { store } from "..";

/* 요청 URL*/
const USER_URL = '/api/v1/user'
const AUTH_URL = '/api/v1/auth'

// 토큰 재발급
export const getToken = async () => {
  const userId = store.getState().user.userId;
  try {
    const data = await request.get(`${AUTH_URL}/refresh/${userId}`);
    return {
      type: GET_TOKEN,
      payload: data,
    };
  } catch (err) {
    console.log(err);
  }
};

// 닉네임 변경
export const updateNicknameRequest = async (dataToSubmit) => {
  const res = await axiosAuth.put(USER_URL, dataToSubmit)
  const data = { ...res, userId: dataToSubmit.nickname }
  return {
    type: UPDATE_PROFILE,
    payload: data,
  };
};

// 비밀번호 변경
export const updatePasswordRequest = async (dataToSubmit) => {
  const res = await axiosAuth.patch(`${USER_URL}/password`, dataToSubmit)
  return res;
};

// 회원가입
export const signupRequest = async (dataToSubmit) => {
  const data = await request.post(USER_URL, dataToSubmit);
  return {
    type: SIGNUP,
    payload: data,
  };
};

// 로그인
export const loginRequest = async (dataToSubmit) => {
  const data = await request.post(`${AUTH_URL}`, dataToSubmit);
  return {
    type: LOGIN,
    payload: data,
  };
};

// 소셜 로그인
export const googleLoginRequest = async (dataToSubmit) => {
  const data = await axiosAuth.post(
    `${AUTH_URL}/authorize/google`,
    dataToSubmit
  );
  return {
    type: GOOGLE_LOGIN,
    payload: data,
  };
};

export const kakaoLoginRequest = async (dataToSubmit) => {
  const data = await axiosAuth.post(
    `${AUTH_URL}/authorize/kakao`,
    dataToSubmit
  );
  return {
    type: KAKAO_LOGIN,
    payload: data,
  };
};

export const naverLoginRequest = async (dataToSubmit) => {
  const data = await axiosAuth.post(
    `${AUTH_URL}/authorize/naver`,
    dataToSubmit
  );
  return {
    type: NAVER_LOGIN,
    payload: data,
  };
};

// 로그아웃
export const logoutRequest = async () => {
  const data = await axiosAuth.delete(`${AUTH_URL}`);
  return {
    type: LOGOUT,
    payload: data,
  };
};

// 이메일이 중복이면 fail, 이메일이 중복이 아니면 success
export const checkEmailRequest = async (dataToSubmit) => {
  const data = await axiosAuth.get(`${USER_URL}/id/${dataToSubmit}`);
  return {
    type: CHECK_EMAIL,
    payload: data,
  };
};

// 닉네임이 중복이면 fail, 닉네임이 중복이 아니면 success
export const checkNicknameRequest = async (dataToSubmit) => {
  const data = await axiosAuth.get(`${USER_URL}/name/${dataToSubmit}`);
  return {
    type: CHECK_NICKNAME,
    payload: data,
  };
};

// 프로필 정보 받아오기
export const getProfileRequest = async () => {
  try {
    const res = await axiosAuth.get(`${USER_URL}/info`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }

};

// 비밀번호 찾기
export const pwInquiryEmailSendRequest = async (dataToSubmit) => {
  try {
    const res = await request.get(`${USER_URL}/password/${dataToSubmit}`);
    return res.data;
  } catch (err) {
    console.log(err)
    return err
  }
};

export const pwInquiryTokenCheckRequest = async (dataToSubmit) => {
  try {
    const res = await request.get(`${USER_URL}/reset-token/${dataToSubmit}`);
    return res.data;
  } catch (err) {
    console.log(err)
    return err
  }
};

export const pwInquiryNewPasswordRequest = async (dataToSubmit) => {
  console.log(dataToSubmit.body)
  try {
    const res = await request.delete(
      `${USER_URL}/reset-token/${dataToSubmit.param}`,
      dataToSubmit.body);
    return res.data;
  } catch (err) {
    console.log(err)
    return err
  }
};

// 회원 탈퇴
export const delAccount = async (dataToSubmit) => {
  const data = await axiosAuth.delete(USER_URL, dataToSubmit);
  return {
    type: DELETE_ACCOUNT,
    payload: data,
  };
};
