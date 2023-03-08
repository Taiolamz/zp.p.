import Cookies from "js-cookie";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { routesPath } from "../utils";

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const { TOKEN, LOGIN, LOGOUT, PASSWORDRESET, SIGNUP } = routesPath;

let AuthToken: string = Cookies.get(TOKEN) || "token";

const instance = axios.create({
  headers: {
    baseURL: BASE_URL,
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    timeout: 5000,
  },
});

instance.interceptors.request.use((config) => {
  if (config.url === LOGOUT) {
    config.baseURL = BASE_URL;
    //  "https://api.zojapay.com/api/v1"
  }

  if (config.url !== LOGIN && config.url !== PASSWORDRESET) {
    config.headers["Authorization"] = "Bearer " + AuthToken;
  }
  return config;
});

instance.interceptors.response.use(
  (res: any) => res.data,

  (err) => {
    if (err.response.state === 403) {
      Cookies.remove(TOKEN);
      window.location.href = LOGIN;
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  }
);

/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
// const api = <T>(cfg: AxiosRequestConfig) => instance.request<any, T>(cfg);
const api = instance;

export default api;
