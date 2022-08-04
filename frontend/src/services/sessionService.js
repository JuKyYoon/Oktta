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
  try {
    const res = await axiosAuth.post(`${SESSION_URL}/${id}`)
    return res.data;
  } catch (err) {
    console.log(err.response)
    return err.response.data;
  } 

}

// 세션 나가기
export const deleteSessionRequest = async (id, token) => {
  try {
    console.log("delete session")
    const res = await axiosAuth.delete(`${SESSION_URL}/${id}`, {data: {token: token }})
    return res.data.result;
  } catch (err) {
    console.log(err.response)
    return err.response.data;
  }

}
