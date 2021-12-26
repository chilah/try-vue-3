import axios from "axios";

const baseInstance = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  timeout: 10000,
});

baseInstance.defaults.headers.get.Accepts = "application/json";
baseInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default baseInstance;
