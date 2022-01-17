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

export default baseInstance;
