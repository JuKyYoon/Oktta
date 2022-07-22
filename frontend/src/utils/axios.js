import axios from "axios";

const DOMAIN = "http://localhost:8080";
// axios.defaults.withCredentials = true; // CORS 에러?

export const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};