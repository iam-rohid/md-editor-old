import axios from "axios";
import { ACCESS_TOKEN_KEY, BASE_URL } from "../constants";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    config.headers!["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
