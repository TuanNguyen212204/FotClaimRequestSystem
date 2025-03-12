import { AxiosError } from "axios";
export class ApiError extends Error {
  public readonly status: number;
  public readonly data: any;
  public readonly headers: Record<string, string | undefined>;
  constructor(error: AxiosError) {
    super(error.message);
    this.status = error.response?.status || 500;
    this.data = error.response?.data || {};
    this.headers = (error.response?.headers || {}) as Record<string, string>;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
