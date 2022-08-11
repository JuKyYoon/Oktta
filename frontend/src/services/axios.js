import axios from "axios";
import { store } from "..";
import { LOGOUT, SET_TOKEN } from "../modules/types";
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
    if (error.response.status === 401) {
      if (result.retry !== true) {
        result.retry = true;
        const accessToken = await getToken()
          .then((res) => {
            if (res.data.message === "success") {
              return res.data.result.accessToken;
            };
          })
          .catch((err) => { return ""; });
        store.dispatch({ type: SET_TOKEN, payload: { accessToken } });
        result.headers.Authorization = `Bearer ${accessToken}`;
        return await axiosAuth(result);
      }
    }
    else if (error.response.status === 403) {
      // 리프레쉬 토큰 만료시
      if (result.retry === true && store.getState().user.isLogin === true) {
        alert("로그인 대기 유효 시간이 만료 되었습니다. 다시 로그인 후 시도해 주세요.");
        store.dispatch({ type: LOGOUT });
        window.location.replace('/user/login');
      }
      // 이메일 인증을 완료하지 않았을 때
      else if (error.response.data.status === "access denied") {
        alert('이메일 인증을 완료해주시길 바랍니다.');
        window.location.replace('/');
      }
      // 로그인하지 않았을 때
      else {
        window.location.replace('/user/login');
      }
    }
    return Promise.reject(error);
  }
);
