import {
  HttpClient,
  HttpClientConfig,
  HttpClientService,
  ApiResponse,
} from "../api/index";
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
  startDate: string;
  endDate: string;
  totalWorkingHours: number;
}
export const config: HttpClientConfig = {
  baseURL: "https://claimsystem.info.vn/api/v1/",
  timeout: 60000,
};

const httpClient = new HttpClient(config);

class ProjectService {
  private httpClient: HttpClientService;

  constructor(httpClient: HttpClientService) {
    this.httpClient = httpClient;
  }

  async getProjects(userId: string): Promise<Project[]> {
    try {
      const response: ApiResponse<ProjectsResponse> =
        await this.httpClient.get<ProjectsResponse>(`project-users/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch projects for user ${userId}:`, error);
      throw error;
    }
  }
  async createClaim(data: CreateClaimData): Promise<ClaimResponse> {
    const response = await this.httpClient.post<CreateClaimResponseBody>(
      "claims",
      data,
    );
    if (response.data.errorCode !== 0) {
      throw new Error(`API error: ${response.data.errorCode}`);
    }
    return response.data.data[0];
  }
}

const projectService = new ProjectService(httpClient);
export default projectService;
