import {
  HttpClient,
  HttpClientConfig,
  HttpClientService,
  ApiResponse,
} from "../api/index";

interface Project {
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
  project_status: number;
  role: string;
}

interface ProjectsResponse {
  httpStatus: number;
  message: string;
  data: Project[];
}

const config: HttpClientConfig = {
  baseURL: "https://claimsystem.info.vn/api/v1/",
  timeout: 10000,
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
        await this.httpClient.get<ProjectsResponse>(`project-users/${userId}`, {
          retry: {
            maxRetries: 4,
            delayMs: 1000,
          },
        });
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch projects for user ${userId}:`, error);
      throw error;
    }
  }
}

const projectService = new ProjectService(httpClient);
export default projectService;
