import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class HttpClient {
  private createAxios: AxiosInstance;

  constructor(baseURL: string) {
    this.createAxios = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      timeout: 5000,
    });
    this.createAxios.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken && !config.headers!.Authorization) {
        config.headers!.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
    this.createAxios.interceptors.response.use(
      (response) => {
        console.log("Success");
        return response;
      },
      (error) => {
        if (!error.response) {
          console.error("Network error or no response from server");
          return Promise.reject(error);
        }
        const status = error.response.status;
        switch (status) {
          case 401:
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            console.log("API: 401 Unauthorized");
            break;
          case 403:
            console.log("API: 403 Forbidden");
            break;
          case 404:
            console.log("API: 404 Not Found");
            break;
          case 500:
            console.log("API: 500 Internal Server Error");
            break;
          case 502:
            console.log("API: 502 Bad Gateway");
            break;
          default:
            console.error(`API Error: ${status}`);
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: unknown): Promise<AxiosResponse<T>> {
    return this.createAxios.get(url, {
      params,
    });
  }
  //axios.post(url[, data[, config]])
  async post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown> | undefined
  ): Promise<AxiosResponse<T>> {
    return this.createAxios.post(url, data, config);
  }
  //axios.put(url[, data[, config]])
  async put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown> | undefined
  ): Promise<AxiosResponse<T>> {
    return this.createAxios.put(url, data, config);
  }
  //axios.patch(url[, data[, config]])
  async patch<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown> | undefined
  ): Promise<AxiosResponse<T>> {
    return this.createAxios.patch(url, data, config);
  }
  //axios.delete(url[, config])
  async delete<T>(url: string, params?: unknown): Promise<AxiosResponse<T>> {
    return this.createAxios.delete(url, {
      params,
    });
  }
}

const httpClient = new HttpClient(import.meta.env.VITE_API_BASE_URL);

export default httpClient;
