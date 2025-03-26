export interface ApiResponse<T> {
  httpStatus: number;
  errorCode: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pagination: {
    totalItems: number;
    totalPages: number;
  };
  data: T;
  message: string;
}
export interface ApiResponseNoGeneric {
  httpStatus: number;
  errorCode: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pagination: {
    totalItems: number;
    totalPages: number;
  };
  data: any;
  message: string;
}
