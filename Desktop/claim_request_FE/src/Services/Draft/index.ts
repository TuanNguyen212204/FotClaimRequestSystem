import {
  HttpClient,
  HttpClientConfig,
  HttpClientService,
  ApiResponse,
} from "../../api/index";
import { Claim, ClaimResponse } from "./Draft.type";
export const config: HttpClientConfig = {
  baseURL: "https://claimsystem.info.vn/api/v1/",
  timeout: 60000,
  DEBUG: true,
};

const httpClient = new HttpClient(config);

class DraftService {
  private httpClient: HttpClientService;

  constructor(httpClient: HttpClientService) {
    this.httpClient = httpClient;
  }
  async getClaims(requestID: string): Promise<Claim[]> {
    try {
      const response: ApiResponse<ClaimResponse> =
        await this.httpClient.get<ClaimResponse>(`claims/${requestID}`);
      return response.data.data;
    } catch (error) {
      console.error(`Failed to fetch claim ${requestID}:`, error);
      throw error;
    }
  }
}
const draftService = new DraftService(httpClient);
export default draftService;
