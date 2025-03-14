export interface ApiResponse<T> {
  project_status: number;
  end_date: any;
  project_id: string;
  start_date: any;
  project_name: string;
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
  message: string;
}
