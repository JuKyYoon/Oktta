import {request} from './axios';

/* 요청 URL*/
const USER_URL = '/api/v1/users'
const AUTH_URL = '/api/v1/auth'

export const signupRequest = (dataToSubmit) => {
  const data = request('post', USER_URL, dataToSubmit);
  return data;
}

export const loginRequest = (dataToSubmit) => {
  const data = request('post', `${AUTH_URL}/authorize`, dataToSubmit);
  return data;
}

export const logoutRequest = (dataToSubmit) => {
  const data = request('post', `${USER_URL}/logout`, dataToSubmit);
  return data;
}

// 이메일이 중복이면 fail, 이메일이 중복이 아니면 success
export const checkEmailRequest =(dataToSubmit) => {
  const data = request("get", `${USER_URL}/id/${dataToSubmit}`);
  return data.message;
}

// 닉네임이 중복이면 fail, 닉네임이 중복이 아니면 success
export const checkNicknameRequest =(dataToSubmit) => {
  const data = request('get', `${USER_URL}/name/${dataToSubmit}`);
  return data.message;
}