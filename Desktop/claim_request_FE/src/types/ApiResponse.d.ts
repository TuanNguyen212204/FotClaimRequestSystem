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
}
