import axios from "axios";

const httpService = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

export function setToken(token: string) {
  httpService.interceptors.request.use((config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return config;
  });
}

export default httpService;
