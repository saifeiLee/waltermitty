import { AxiosInstance } from "axios";
import { allControllers, createClient } from "@mx-space/api-client";
import { axiosAdaptor } from "@mx-space/api-client/dist/adaptors/axios";

import { API_URL } from "~/constant/env";
import PKG from "../../package.json";

import { getToken } from "./cookie";

const genUUID = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const uuid = genUUID();

export const apiClient = createClient(axiosAdaptor)(API_URL, {
  controllers: allControllers,
});

export const $axios = axiosAdaptor.default as AxiosInstance;

$axios.defaults.timeout = 10000;
$axios.defaults.headers.common[
  "User-Agent"
] = `NextJS/v${PKG.dependencies.next} (${PKG.name}@${PKG.version})`;

$axios.interceptors.request.use((config) => {
  const token = getToken();
  if (config.headers) {
    if (token) {
      config.headers["Authorization"] = token;
    }
    config.headers["x-uuid"] = uuid;
  }
  return config;
});
