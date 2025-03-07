import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";
import {
  HttpClientService,
  ApiResponse,
  ExtendedAxiosRequestConfig,
  HttpClientConfig,
  RequestOptions,
} from "./types";
import { ApiError } from "./errors";
export class HttpClient implements HttpClientService {
  private client: AxiosInstance;
  private config: HttpClientConfig;
  private isRefreshing: boolean = false;
  private refreshSubscribers: Array<(token: string | null) => void> = [];

  constructor(config: HttpClientConfig) {
    this.config = config;

    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const extendedConfig = config as ExtendedAxiosRequestConfig;

        if (!extendedConfig.skipAuth && this.config.auth?.tokenProvider) {
          const token = await this.config.auth.tokenProvider();
          if (token) {
            const tokenType = this.config.auth.tokenType || "Bearer";
            config.headers.set("Authorization", `${tokenType} ${token}`);
          }
        }
        return config;
      }
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        if (
          error.response?.status === 401 &&
          this.config.auth?.refreshToken &&
          !originalRequest.skipAuth &&
          originalRequest._retry !== -1
        ) {
          originalRequest._retry = -1;

          if (this.isRefreshing) {
            try {
              return new Promise((resolve, reject) => {
                this.addRefreshSubscriber((token) => {
                  if (token) {
                    originalRequest.headers.set(
                      "Authorization",
                      `Bearer ${token}`
                    );
                    resolve(this.client(originalRequest));
                  } else {
                    reject(new ApiError(error));
                  }
                });
              });
            } catch (refreshError) {
              // eslint-disable-line

              throw new ApiError(error);
            }
          } else {
            this.isRefreshing = true;

            try {
              const newToken = await this.config.auth.refreshToken!();
              this.isRefreshing = false;

              if (newToken) {
                originalRequest.headers.set(
                  "Authorization",
                  `Bearer ${newToken}`
                );
                this.onRefreshSuccess(newToken);
                return this.client(originalRequest);
              } else {
                this.onRefreshFailure();
                throw new ApiError(error);
              }
            } catch (refreshError) {
              // eslint-disable-line
              this.isRefreshing = false;
              this.onRefreshFailure();
              if (this.config.auth.onRefreshFailure) {
                this.config.auth.onRefreshFailure();
              }
              throw new ApiError(error);
            }
          }
        }

        if (
          originalRequest._retry !== undefined &&
          originalRequest._retry !== -1
        ) {
          const maxRetries = originalRequest._maxRetries || 0;
          if (originalRequest._retry < maxRetries && this.shouldRetry(error)) {
            originalRequest._retry++;

            const delay =
              originalRequest._delayMs! *
              Math.pow(2, originalRequest._retry - 1);
            await this.sleep(delay);

            return this.client(originalRequest);
          }
        }

        throw new ApiError(error);
      }
    );
  }

  private shouldRetry(error: any): boolean {
    return (
      !error.response ||
      (error.response.status >= 500 && error.response.status <= 599)
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private addRefreshSubscriber(callback: (token: string | null) => void): void {
    this.refreshSubscribers.push(callback);
  }

  private onRefreshSuccess(token: string): void {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  private onRefreshFailure(): void {
    this.refreshSubscribers.forEach((callback) => callback(null));
    this.refreshSubscribers = [];
  }

  private async request<T>(
    method: string,
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      ...options,
    };

    if (data !== undefined) {
      requestConfig.data = data;
    }

    const extendedConfig =
      requestConfig as unknown as ExtendedAxiosRequestConfig;

    if (options?.retry || this.config.defaultRetry) {
      const retry = options?.retry || this.config.defaultRetry;
      extendedConfig._retry = 0;
      extendedConfig._maxRetries = retry!.maxRetries;
      extendedConfig._delayMs = retry!.delayMs;
    }

    if (options?.skipAuth) {
      extendedConfig.skipAuth = options.skipAuth;
    }

    try {
      const response: AxiosResponse<T> = await this.client(requestConfig);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        header: response.headers as Record<string, string | undefined>,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error as any);
    }
  }

  public async get<T>(
    url: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url, undefined, options);
  }

  public async post<T, D = any>(
    url: string,
    data?: D,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, data, options);
  }

  public async put<T, D = any>(
    url: string,
    data?: D,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", url, data, options);
  }

  public async patch<T, D = any>(
    url: string,
    data?: D,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("PATCH", url, data, options);
  }

  public async delete<T>(
    url: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", url, undefined, options);
  }
}
