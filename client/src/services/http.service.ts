import axios, { AxiosRequestConfig } from "axios";
import {} from "@auth0/auth0-react";

const httpService = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

export default httpService;
