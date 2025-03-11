import {
  HttpClient,
  HttpClientConfig,
  HttpClientService,
  ApiResponse,
} from "../api/index";
import { FormData } from "@/types/claimForm.type";
interface Project {
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
  project_status: number;
  role?: string;
}

interface ProjectsResponse {
  httpStatus: number;
  message: string;
  data: Project[];
}
interface PostClaimResponse {
  httpStatus: number;
  message: string;
  data: {
    project_id: string;
    project_name: string;
    start_date: string;
    end_date: string;
    project_status: number;
  };
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
        await this.httpClient.get<ProjectsResponse>("projects", {
          retry: {
            maxRetries: 4,
            delayMs: 1000,
          },
        });
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      throw error;
    }
  }

  // async createClaim(data: FormData): Promise<PostClaimResponse> {
  //   const { claims, currentSelectedProject, claimRemark } = data;
  //   const newdata = {
  //     project_id: currentSelectedProject.projectID,
  //     project_name: currentSelectedProject.projectName,
  //     start_date: currentSelectedProject.ProjectDuration.from,
  //   };
  // }
}

const projectService = new ProjectService(httpClient);
export default projectService;
