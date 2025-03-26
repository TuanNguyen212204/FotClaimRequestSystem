export interface ClaimResponse {
  claimID: string;
  userID: string;
  projectID: string;
  submittedDate: string;
  startDate: string;
  endDate: string;
  totalWorkingHours: number;
  claimStatus: string;
}
export interface Project {
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
  project_status: number;
  role: string;
}
export interface CreateClaimResponseBody {
  httpStatus: number;
  errorCode: number;
  data: ClaimResponse[];
}
export interface ProjectsResponse {
  httpStatus: number;
  message: string;
  data: Project[];
}
export interface CreateClaimData {
  userID: string;
  projectID: string;
  claims: {
    date: string;
    working_hours: number;
  }[];
}
export interface UpdateClaimData extends CreateClaimData {
  requestID: string;
}
export interface projectsParamOptions {
  page: number;
  limit: number;
  sortBy:
    | "project_id"
    | "project_name"
    | "start_date"
    | "end_date"
    | "project_status";
  order: "ASC" | "DESC";
}
export interface allProjectsreponse {
  httpStatus: number;
  message: string;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: Project[];
}
