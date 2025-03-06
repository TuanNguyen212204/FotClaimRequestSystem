// import axios, { AxiosInstance } from "axios";

// class axiosInstance {
//   private api: AxiosInstance;

//   constructor(baseURL: string, timeout: number = 5000) {
//     this.api = axios.create({
//       baseURL: baseURL,
//       timeout: timeout,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     this.setupInterceptors();
//   }

//   private setupInterceptors() {
//     this.api.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem("access_token");
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error);
//       }
//     );

//     this.api.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         if (error.response?.status === 401) {
//           // Optional chaining
//           localStorage.removeItem("access_token");
//           window.location.href = "/login";
//         }
//         return Promise.reject(error);
//       }
//     );
//   }

//   get(url: string, params = {}) {
//     return this.api.get(url, { params });
//   }

//   post(url: string, data = {}) {
//     return this.api.post(url, data);
//   }

//   put(url: string, data = {}) {
//     return this.api.put(url, data);
//   }

//   delete(url: string) {
//     return this.api.delete(url);
//   }

//   update(url: string, data = {}) {
//     return this.api.patch(url, data);
//   }

//   patch(url: string, data = {}) {
//     return this.api.patch(url, data);
//   }
// }

// const apiInstance = new axiosInstance("https://claimsystem.info.vn/api/v1");

// export default apiInstance;

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
  post<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown> | undefined
  ): Promise<AxiosResponse<T>> {
    return this.createAxios.post(url, data, config);
  }
  //axios.put(url[, data[, config]])
  put<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown> | undefined
  ): Promise<AxiosResponse<T>> {
    return this.createAxios.put(url, data, config);
  }
  //axios.patch(url[, data[, config]])
  patch<T>(
    url: string,
    data: unknown,
    config?: AxiosRequestConfig<unknown> | undefined
  ): Promise<AxiosResponse<T>> {
    return this.createAxios.patch(url, data, config);
  }
  //axios.delete(url[, config])
  delete<T>(url: string, params?: unknown): Promise<AxiosResponse<T>> {
    return this.createAxios.delete(url, {
      params,
    });
  }
}

const httpClient = new HttpClient("https://claimsystem.info.vn/api/v1");

export default httpClient;
