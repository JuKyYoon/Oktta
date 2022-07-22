import {request} from './axios';

/* 요청 URL*/
const USER_URL = "/api/v1/users"

export const signupRequest = (dataToSubmit) => {
  const data = request("post", USER_URL+"/signup", dataToSubmit);
  return data;
}

export const loginRequest = (dataToSubmit) => {
  console.log(`로그인: ${dataToSubmit}`);
  const data = request("post", USER_URL+"/login", dataToSubmit);
  return data;
}

export const logoutRequest = (dataToSubmit) => {
  const data = request("post", USER_URL + "/logout", dataToSubmit);
  return data;
}


// 이메일이 중복이면 true, 이메일이 중복이 아니면 false
export const checkEmailRequest =(dataToSubmit) => {
  const data = request("get", USER_URL + "/이메일 중복체크", dataToSubmit);
  return data;
}

// 닉네임이 중복이면 true, 닉네임이 중복이 아니면 false
export const checkNicknameRequest =(dataToSubmit) => {
  const data = request("get", USER_URL + "/닉네임 중복체크,", dataToSubmit);
  return data;
}