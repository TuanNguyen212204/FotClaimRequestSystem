import {
  HttpClient,
  HttpClientConfig,
  HttpClientService,
  ApiResponse,
} from "../api/index";
interface Project {
  projectID: string;
  projectName: string;
  startDate: string;
  endDate: string;
  projectStatus: number;
  role?: string;
}

interface ProjectsResponse {
  projects: Project[];
}

const config: HttpClientConfig = {
  baseURL: "https://claimsystem.info.vn/api/v1/",
  timeout: 10000, //simple add token later don gian
};

const httpClient = new HttpClient(config);

class ProjectService {
  private httpClient: HttpClientService;

  constructor(httpClient: HttpClientService) {
    this.httpClient = httpClient;
  }

  async getProjects(): Promise<Project[]> {
    try {
      const response: ApiResponse<ProjectsResponse> =
        await this.httpClient.get<ProjectsResponse>("projects");
      return response.data.projects;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      throw error;
    }
  }
}

const projectService = new ProjectService(httpClient);
export default projectService;
