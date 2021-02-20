import axios from "axios";

const httpService = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
});

export default httpService;
