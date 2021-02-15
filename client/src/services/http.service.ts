import axios, { AxiosRequestConfig } from "axios";
import {} from "@auth0/auth0-react";

const authInterceptor = (config: AxiosRequestConfig) => {
  // TODO get the token
  const token = "todolater";
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

const httpService = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

httpService.interceptors.request.use(authInterceptor);

export default httpService;
