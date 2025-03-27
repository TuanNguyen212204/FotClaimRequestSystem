import {
  HttpClient,
  HttpClientConfig,
  HttpClientService,
  ApiResponse,
} from "../../api/index";
import {
  ProjectsResponse,
  ClaimResponse,
  CreateClaimData,
  Project,
  CreateClaimResponseBody,
  projectsParamOptions,
  allProjectsreponse,
} from "./Project.type";
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
  async getAllProjects(
    options: projectsParamOptions
  ): Promise<allProjectsreponse> {
    try {
      const response: ApiResponse<allProjectsreponse> =
        await this.httpClient.get<allProjectsreponse>("projects", {
          params: options,
        });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      throw error;
    }
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
      data
    );
    if (response.data.errorCode !== 0) {
      throw new Error(`API error: ${response.data.errorCode}`);
    }
    return response.data.data[0];
  }
  async updateClaim(
    data: CreateClaimData,
    requestID: string
  ): Promise<ClaimResponse> {
    if (!requestID) {
      throw new Error("Request ID is required");
    }
    const response = await this.httpClient.put<CreateClaimResponseBody>(
      `claims/${requestID}`,
      data
    );
    if (response.data.errorCode !== 0) {
      throw new Error(`API error: ${response.data.errorCode}`);
    }
    return response.data.data[0];
  }
}

const projectService = new ProjectService(httpClient);
export default projectService;
