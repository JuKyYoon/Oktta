import { request, axiosAuth } from "./axios";
import {
  LOGIN,
  LOGOUT,
  UPDATE_NICKNAME,
  TOKEN_DELETE,
  TIER_REAUTH
} from "../modules/types.js";
import { store } from "..";

/* 요청 URL*/
export const USER_URL = "/api/v1/user";
export const AUTH_URL = "/api/v1/auth";

// 토큰 재발급
export const getToken = async () => {
  try {
    const payload = await request.get(`${AUTH_URL}/refresh`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 이메일 인증 재전송
export const sendEmail = async () => {
  try {
    const payload = await axiosAuth.get(`${USER_URL}/reauth`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 이메일 인증 성공/실패 여부
export const emailAuth = async (dataToSubmit) => {
  try {
    const payload = await request.get(`${USER_URL}/auth/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 닉네임 변경
export const updateNicknameRequest = async (dataToSubmit) => {
  try {
    const res = await axiosAuth.put(USER_URL, dataToSubmit);
    const payload = { ...res, nickname: dataToSubmit.nickname };
    return {
      type: UPDATE_NICKNAME,
      payload
    };
  } catch (err) {
    return err;
  }
};

// 비밀번호 변경
export const updatePasswordRequest = async (dataToSubmit) => {
  try {
    const payload = await axiosAuth.patch(`${USER_URL}/password`, dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// 회원가입
export const signupRequest = async (dataToSubmit) => {
  try {
    const payload = await request.post(USER_URL, dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// 로그인
export const loginRequest = async (dataToSubmit) => {
  try {
    const payload = await request.post(`${AUTH_URL}`, dataToSubmit);
    return {
      type: LOGIN,
      payload
    };
  } catch (err) {
    return err;
  }
};

// 로그아웃
export const logoutRequest = async () => {
  try {
    await axiosAuth.delete(`${AUTH_URL}`);

  } catch(err) {

  }
  finally {
    // 여기서 엑세스 토큰도 삭제
    store.dispatch({ type: TOKEN_DELETE });
  }
};

// 이메일이 중복이면 fail, 이메일이 중복이 아니면 success
export const checkEmailRequest = async (dataToSubmit) => {
  try {
    const payload = await request.get(`${USER_URL}/id/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 닉네임이 중복이면 fail, 닉네임이 중복이 아니면 success
export const checkNicknameRequest = async (dataToSubmit) => {
  try {
    const payload = await request.get(`${USER_URL}/name/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 프로필 정보 받아오기
export const getProfileRequest = async () => {
  try {
    const payload = await axiosAuth.get(`${USER_URL}/info`);
    return payload;
  } catch (err) {
    return err;
  }
};

// 비밀번호 찾기
export const pwInquiryEmailSendRequest = async (dataToSubmit) => {
  try {
    const payload = await request.get(`${USER_URL}/password/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err
  }
};

export const pwInquiryTokenCheckRequest = async (dataToSubmit) => {
  try {
    const payload = await request.get(`${USER_URL}/reset-token/${dataToSubmit}`);
    return payload;
  } catch (err) {
    return err
  }
};

export const pwInquiryNewPasswordRequest = async (dataToSubmit) => {
  try {
    const payload = await request.delete(`${USER_URL}/reset-token/${dataToSubmit.param}`, dataToSubmit.body);
    return payload;
  } catch (err) {
    return err
  }
};

// 회원 탈퇴
export const delAccount = async (dataToSubmit) => {
  try {
    const payload = await axiosAuth.delete(USER_URL, dataToSubmit);
    return payload;
  } catch (err) {
    return err;
  }
};

// 프로필 이미지 설정
export const setProfileImg = async (dataToSubmit) => {
  try {
    const payload = await axiosAuth.post(`${USER_URL}/profile-img`, dataToSubmit);
    return payload;
  } catch (err) {
    return err
  }
};

// 기본 프로필 이미지 설정
export const setDefaultImg = async () => {
  try {
    const payload = await axiosAuth.delete(`${USER_URL}/profile-img`);
    return payload;
  } catch (err) {
    return err
  }
};

// 티어 재인증
export const tierReauth = async () => {
  try {
    const payload = await axiosAuth.get(`${USER_URL}/tier`);
    return {
      type: TIER_REAUTH,
      payload
    };
  } catch (err) {
    return err
  }
};