import axios from 'axios';

// Create API helper funtions for send Network request with axios and Bind access token to network request

const API_URL = 'http://localhost:3005';

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

function bindToken() {
  const token = localStorage.getItem('TOKEN');
  axiosApi.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export async function get(url, config = {}) {
  bindToken();
  return await axiosApi.get(url, { ...config }).then((response) => response.data);
}

export async function post(url, data, config = {}) {
  bindToken();
  return axiosApi.post(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function put(url, data, config = {}) {
  bindToken();
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function patch(url, data, config = {}) {
  bindToken();
  return axiosApi.patch(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function del(url, config = {}) {
  bindToken();
  return await axiosApi.delete(url, { ...config }).then((response) => response.data);
}
