export interface ApiResponse<T> {
  notificaitons(notificaitons: any): unknown;
  notìications(notìications: any): unknown;
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
