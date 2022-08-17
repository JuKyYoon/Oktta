/* eslint-disable*/
import axios from 'axios';
import { store } from '..';
import { LOGOUT, SET_TOKEN } from '../modules/types';
import { getToken } from './userService';

/**
 * 인증 필요없는 Axios
 */
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

/**
 * 인증 필요한 Axios
 */
export const axiosAuth = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000,
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
    console.log(error);

    // 로그아웃에 대한 거면 그냥 Pass 시킨다.
    if (result.url === '/api/v1/auth' && result.method === 'delete') {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && result.retry !== true) {
      result.retry = true;
      const res = await getToken();
      console.log(res);

      if (res?.data.message === 'success') {
        const accessToken = res.data.result.accessToken;
        store.dispatch({ type: SET_TOKEN, payload: { accessToken } });

        // Content-Type을 기본 Request 와 동일하게만들어준다.
        if (result.headers['Content-Type'] != undefined) {
          error.response.config.headers = {
            Authorization: 'Bearer ' + res.accessToken,
            'Content-Type': result.headers['Content-Type'],
          };
        } else {
          error.response.config.headers = {
            Authorization: 'Bearer ' + res.accessToken,
          };
        }
        return await axiosAuth(result);
      } else {
        // RefreshToken 재발급 실패
        alert('다시 로그인 후 시도해 주세요.');
        store.dispatch({ type: LOGOUT });
        window.location.replace('/user/login');
      }
    } else if (error?.response?.data?.result === 'access denied') {
      if (result.url === '/api/v1/user/reauth') {
        alert('권한이 없습니다.');
      } else {
        alert('이메일 인증을 완료해주시길 바랍니다.');
      }
      window.location.replace('/');
    } else if (
      result.url === '/api/v1/auth/refresh' ||
      error?.response?.data?.result === 'no token' ||
      error?.response?.data?.result === 'forbidden'
    ) {
      // 리프레시 토큰 재요청에서 오류가 나면, 무조건 다시 로그인 시킨다. ( 리프레시 토큰 시간 만료 혹은 유효성 검사 실패 )
      alert('로그인 후 시도해 주세요.');
      store.dispatch({ type: LOGOUT });
      window.location.replace('/user/login');
    }
    // .catch() 로 이어진다.
    return Promise.reject(error);
  }
);

export const riotRequest = axios.create({
  baseURL: process.env.REACT_APP_RIOT_API_URL,
});
