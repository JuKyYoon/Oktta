import axios from "axios";
import { store } from "..";
import { getToken } from "./userService";

const DOMAIN = "http://localhost:8080";
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjU5MDc5Mzc5LCJleHAiOjE2NjAyODg5Nzl9.tpA2YLDZQoQm6nykABpKHdBtRigu0kPZP3b9a42IbaE'

export const request = axios.create({
  baseURL: DOMAIN,
});

export const axiosAuth = axios.create({
  baseURL: DOMAIN,
  withCredentials: true,
});

axiosAuth.interceptors.request.use(
  function (config) {
    // const accessToken = store.getState().user.token;
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
