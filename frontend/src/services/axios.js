import axios from "axios";
import { store } from "..";
import { initState } from "../modules/user";
import { getToken } from "./userService";

export const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export const axiosAuth = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

axiosAuth.interceptors.request.use(
  function (config) {
    const accessToken = store.getState().user.token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const result = error.config;
    if (error.response.status === 401 && result.retry != true) {
      result.retry = true;
      const accessToken = await getToken()
        .then((res) => {})
        .catch((err) => console.log(err));
      result.headers.Authorization = `Bearer ${accessToken}`;
      // console.log(result)
      return await axiosAuth(result);
    } else {
      // 추가 작업 필요
      // 로컬 스토리지에서 로그인 데이터 삭제
      console.log("deleted user data from local storage");
      store.getState().user = initState;
    }
    return Promise.reject(error);
  }
);
