import { UserStorage } from "@/helper";
import { UserData } from "@/type";
import axios from "axios";

const userStorage = new UserStorage("user");

const baseInstance = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 10000,
});

baseInstance.defaults.headers.get.Accepts = "application/json";
baseInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

baseInstance.interceptors.request.use(
  (config) => {
    const token = userStorage.getStorage<UserData>()?.token ?? "";

    if (token && config.headers) {
      config.headers.authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
baseInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => Promise.reject(error)
);

export default baseInstance;
