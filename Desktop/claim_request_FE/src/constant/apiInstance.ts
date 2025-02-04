import axios, { InternalAxiosRequestConfig, CreateAxiosDefaults } from "axios";
export const apiInstance = {
  create: (configDefault?: CreateAxiosDefaults) => {
    const api = axios.create(configDefault);
    api.interceptors.request.use((config) => {
      return {
        ...config,
        headers: {},
      } as unknown as InternalAxiosRequestConfig;
    });
    return api;
  },
};
