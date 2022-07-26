import {request} from './axios';

/* 요청 URL*/
const USER_URL = '/api/v1/user'
const AUTH_URL = '/api/v1/auth'

export const signupRequest = (dataToSubmit) => {
  const data = request('post', USER_URL, dataToSubmit);
  return data;
}

export const updateNicknameRequest = (dataToSubmit) => {
  const message = request('put', USER_URL, dataToSubmit)
    .then((data) => data?.message);;
  return message? message : 'fail';
}

export const updatePasswordRequest = (dataToSubmit) => {
  const message = request('patch', `${USER_URL}/password`, dataToSubmit)
    .then((data) => data?.message);;
  return message;
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
  const message = request("get", `${USER_URL}/id/${dataToSubmit}`)
    .then((data) => data?.message);
  return message;
}

// 닉네임이 중복이면 fail, 닉네임이 중복이 아니면 success
export const checkNicknameRequest =(dataToSubmit) => {
  const message = request('get', `${USER_URL}/name/${dataToSubmit}`)
    .then((data) => data?.message);
  return message;
}