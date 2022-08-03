import { axiosAuth } from "./axios";

/* 요청 URL */
const SESSION_URL = "/api/v1/session";

// 세션 참가
export const joinSessionRequest = async (id) => {
  const res = await axiosAuth.get(`${SESSION_URL}/${id}`)
  console.log(res)
  return res.data.result
}

// 세션 생성
export const createSessionRequest = async (id) => {
  const res = await axiosAuth.post(`${SESSION_URL}/${id}`)
  return res.data.result
}

// 세션 종료
export const deleteSessionRequest = async (id) => {
  const res = await axiosAuth.delete(`${SESSION_URL}/${id}`)
  return res.data.result
}
