import axios from "axios";
import { store } from "..";
import { initState } from "../modules/user";
import { getToken } from "./userService";

export const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    window.location.replace('/');
    return Promise.reject(error);
  }
);

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
    // 로그인이 되어있지 않을 때 로그인 페이지로 이동
    else {
      window.location.replace('/user/login');
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
        .then((res) => {
          if (res.data.message === "success") {
            return res.data.result.accessToken;
          };
        })
        .catch((err) => { return ""; });
      store.getState().user.accessToken = accessToken;
      result.headers.Authorization = `Bearer ${accessToken}`;
      // console.log(result)
      return await axiosAuth(result);
    } else {
      // 추가 작업 필요
      // 로컬 스토리지에서 로그인 데이터 삭제
      if (store.getState().user.isLogin === true) {
        console.log("deleted user data from local storage");
        store.getState().user = initState;
        window.location.replace('/user/login');
      };
    }
    return Promise.reject(error);
  }
);
