import { axiosAuth } from "./axios";

/* 요청 URL */
const SESSION_URL = "/api/v1/session";

// 세션 참가
export const joinSessionRequest = async (id) => {
  const res = await axiosAuth.get(`${SESSION_URL}/${id}`)
  console.log(res)
  return res.data.result
}

// 세션 생성 후 참가
export const createSessionRequest = async (id) => {
  try {
    const res = await axiosAuth.post(`${SESSION_URL}/${id}`)
    return res.data;
  } catch (err) {
    console.log(err.response)
    return err.response.data;
  } 

}


export const closeSessionRequest = async (idx) => {
  try {
    const res = await axiosAuth.delete(`${SESSION_URL}/${idx}`)
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export const startRecording = async (idx, sessionId) => {
  try {
    const res = await axiosAuth.post(`${SESSION_URL}/recording/start/${idx}`, {
      sessionId: sessionId
    })
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}


export const stopRecording = async (idx, recordingId) => {
  try {
    const res = await axiosAuth.post(`${SESSION_URL}/recording/stop/${idx}`, {
      recording: recordingId
    })
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}


export const closeSession = async (idx) => {
  try {
    const res = await axiosAuth.delete(`${SESSION_URL}/${idx}`)
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}
