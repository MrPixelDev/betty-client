import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

// TODO: withCredentials obsidian
const server = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}`,
});

// interceptors of axios obsidian
server.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

server.interceptors.response.use(
  (config) => {
    return config;
  },
  // TODO: Process obsidian
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await server.get<AuthResponse>("/auth/refresh");
        localStorage.setItem("token", response.data.accessToken);
        return server.request(originalRequest);
      } catch (e: any) {
        console.log(e);
      }
    }
    console.log(error);
    throw error;
  }
);

export default server;
