import axios from "axios";
import { store } from "..";
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
    // console.log(result)
    if (error.response.status === 401 && result.retry != true) {
      result.retry = true;
      const accessToken = await getToken().payload.then((res) => console.log(res));
      result.headers.Authorization = `Bearer ${accessToken}`;
      // console.log(result)
      return await axiosAuth(result);
    }
    else {
      // 추가 작업 필요
    }
    return Promise.reject(error);
  }
);
