import { AxiosError } from "axios";
export class ApiError extends Error {
  public readonly status: number;
  public readonly data: {
    code?: number;
    errorCode?: number;
    message?: string;
    stack?: string;
  };
  public readonly headers: Record<string, string | undefined>;

  constructor(error: AxiosError) {
    super(
      error.response?.data?.message || error.message || "API Error occurred",
    );

    this.status = error.response?.status || 500;
    this.data = error.response?.data || {};
    this.headers = (error.response?.headers || {}) as Record<
      string,
      string | undefined
    >;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
