
import {request} from './axios';


/* 요청 URL*/
const USER_URL = "/api/v1/users"


export const signupRequest = (dataToSubmit) => {
  return request("post", USER_URL+"/signup", dataToSubmit);
}

export const loginRequest = (dataToSubmit) => {
  return request("post", USER_URL+"/login", dataToSubmit)
}

export const logoutRequest = (dataToSubmit) => {
  return request("post", USER_URL + "/logout", dataToSubmit)
}


// 이메일이 중복이면 true, 이메일이 중복이 아니면 false
export const checkEmailRequest =(dataToSubmit) => {
  console.log("이메일 중복확인보냈음")
  return request("get", USER_URL + "/이메일 중복체크", dataToSubmit)
}

// 닉네임이 중복이면 true, 닉네임이 중복이 아니면 false
export const checkNicknameRequest =(dataToSubmit) => {
  console.log("닉네임 중복확인보냈음")
  return request("get", USER_URL + "/닉네임 중복체크,", dataToSubmit)
}