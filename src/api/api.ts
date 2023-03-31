import Cookies from "js-cookie";
import axios from "axios";
// import { AxiosRequestConfig } from "axios";
import { routesPath, showMessage } from "../utils";

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const { TOKEN, LOGIN, LOGOUT, PASSWORDRESET } = routesPath;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

instance.interceptors.request.use(async (config) => {
  let AuthToken: string = (await Cookies.get(TOKEN)) || "token";

  // if (config?.addTrailingSlash && config?.url[config?.url?.length - 1] !== "\") {
  //   config.url += "\"
  // }

  if (config.url === LOGOUT) {
    config.baseURL = BASE_URL;
  }

  if (config.url !== LOGIN && config.url !== PASSWORDRESET) {
    config.headers.Authorization = "Bearer " + AuthToken;
  }

  return config;
});

instance.interceptors.response.use(
  (res: any) => res.data,

  (err) => {
    if (err.response.status === 403) {
      Cookies.remove(TOKEN);
      window.location.href = LOGIN;
      return Promise.reject(err.response.data);
    }

    if (err.response.status === 401) {
      showMessage({
        type: "error",
        message: err.response.data.error.message[0],
      });
    }

    if (err.response.status === 404) {
      showMessage({
        type: "error",
        message: err.response.data.error.message,
      });
    }

    if (err.response.status === 422) {
      showMessage({
        type: "error",
        message: err.response.data.error.message[0],
      });
    }

    if (err.response.status === 503) {
      showMessage({
        type: "error",
        message: err.response.data.error.message,
      });
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
// const api = <T>(cfg: any) => instance.request<any, T>(cfg);
const api = instance;

export default api;
