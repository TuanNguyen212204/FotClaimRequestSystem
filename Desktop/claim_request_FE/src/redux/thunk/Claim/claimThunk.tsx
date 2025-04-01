import httpClient from "@constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Claim,
  DetailPendingClaim,
  PendingClaim,
  RejectedClaim,
  DetailClaimApprover,
  DetailClaimFinance,
  ClaimApprovedApprover,
  ClaimApprovedFinance,
  MyClaimDetail,
  DraftApproval,
} from "@/types/Claim";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay } from "@utils/delay";
import { stat } from "fs";
import { string } from "yup";

export const fetchAllClaimAsync = createAsyncThunk<Claim[]>(
  "claim/fetchAllClaim",
  async (): Promise<Claim[]> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<Claim[]>>(
        "/approvers/approved-claim"
      );
      return response.data.data;
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);
// //------------------------------------------------- GET APPROVED CLAIMS FOR APPROVER ----------------------------------------------------------------------
// export const fetchApprovedClaimsApproverAsync = createAsyncThunk<
//   { data: ClaimApprover[]; totalPages: number },
//   { page: string; limit: string }
// >("claim/approver/fetchApprovedClaim", async ({ page, limit }) => {
//   try {
//     await delay(1000);
//     const response = await httpClient.get<ApiResponse<ClaimApprover[]>>(
//       "/approvers/approved-claim",
//       { page: page, limit: limit }
//     );
//     return {
//       data: response.data.data,
//       totalPages: response.data.totalPages,
//     };
//   } catch (error) {
//     console.error("Fetch Approverd Claims for Approver error " + error);
//     throw error;
//   }
// });
//------------------------------------------------- GET APPROVED DETAIL CLAIM FOR APPROVER ----------------------------------------------------------------------
export const fetchApprovedDetailApproverAsync = createAsyncThunk<
  { data: DetailClaimApprover },
  { request_id: string }
>("claim/approver/fetchApprovedDetail", async ({ request_id }) => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<DetailClaimApprover>>(
      `/claims/${request_id}`
    );
    return {
      data: response.data.data,
    };
  } catch (error) {
    console.error("Fetch Approved Detail for Finance error " + error);
    throw error;
  }
});

//------------------------------------------------- GET APPROVED CLAIMS FOR FINANCE ----------------------------------------------------------------------
export const fetchApprovedClaimsFinanceAsync = createAsyncThunk<
  { data: ClaimApprovedFinance[]; totalPages: number },
  { page: string; limit: string }
>("claim/finance/fetchApprovedClaim", async ({ page, limit }) => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<ClaimApprovedFinance[]>>(
      "/finance/claims/approved",
      { page: page, limit: limit }
    );
    return {
      data: response.data.data,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Fetch Approved Claims for Finance error " + error);
    throw error;
  }
});
//------------------------------------------------- GET APPROVED DETAIL CLAIM FOR FINANCE ----------------------------------------------------------------------
export const fetchApprovedDetailFinanceAsync = createAsyncThunk<
  { data: DetailClaimFinance },
  { request_id: string }
>("claim/finance/fetchApprovedDetail", async ({ request_id }) => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<DetailClaimFinance>>(
      `/finance/claims/approved/request/${request_id}`
    );
    return {
      data: response.data.data,
    };
  } catch (error) {
    console.error("Fetch Approved Detail for Finance error " + error);
    throw error;
  }
});

//------------------------------------------------- GET APPROVED CLAIMS FOR APPROVER  ----------------------------------------------------------------------
export const fetchApprovedClaimsApproverAsync = createAsyncThunk<
  { data: ClaimApprovedApprover[]; totalPages: number },
  { page: string; limit: string }
>("claim/approver/fetchApprovedClaim", async ({ page, limit }) => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<ClaimApprovedApprover[]>>(
      "/approvers/approved-claim",
      { page: page, limit: limit }
    );
    return {
      data: response.data.data,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Fetch Approverd Claims for Approver error " + error);
    throw error;
  }
});
//------------------------------------------------- GET PENDING CLAIM FOR APPROVAL ----------------------------------------------------------------------
export const fetchAllPendingClaimAsync = createAsyncThunk<
  { data: PendingClaim[]; totalPages: number },
  { page: string; limit: string }
>("claim/approver/fetchPendingClaim", async ({ page, limit }) => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<PendingClaim[]>>(
      "/approvers/pending-claim",
      { page: page, limit: limit }
    );
    console.log("data: ", response.data);
    return {
      data: response.data.data,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Fetch Pending Claims for Approver error " + error);
    throw error;
  }
});

//------------------------------------------------- GET DETAILS PENDING CLAIM FOR APPROVAL ----------------------------------------------------------------------

export const fetchPendingClaimDetailAsync = createAsyncThunk<
  { data: DetailPendingClaim[]; totalPages: number },
  { page: string; limit: string; request_id: string }
>(
  "claim/approver/fetchPendingClaimDetail",
  async ({ page, limit, request_id }) => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<DetailPendingClaim[]>>(
        `/approvers/pending-claim/${request_id}`,
        { page: page, limit: limit }
      );
      console.log("data: ", response.data);
      return {
        data: response.data.data,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error("Fetch Pending Claims for Approver error " + error);
      throw error;
    }
  }
);

//------------------------------------------------- GET REJECTED CLAIM FOR APPROVAL ----------------------------------------------------------------------
export const fetchAllRejectedClaimAsync = createAsyncThunk<
  { data: RejectedClaim[]; totalPages: number },
  { page: string; limit: string }
>("claim/approver/fetchRejectedClaim", async ({ page, limit }) => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<RejectedClaim[]>>(
      "/approvers/rejected-claim",
      { page: page, limit: limit }
    );
    console.log("data: ", response.data);
    return {
      data: response.data.data || [],
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Fetch Rejected Claims for Approver error " + error);
    throw error;
  }
});

//------------------------------------------------- GET REJECTED CLAIM FOR APPROVAL ----------------------------------------------------------------------
export const fetchAllDraftClaimAsync = createAsyncThunk<
  { data: DraftApproval[]; totalPages: number },
  { page: string; limit: string }
>("claim/approver/fetchDraftClaim", async ({ page, limit }) => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<DraftApproval[]>>(
      "/approvers/draft-claim",
      { page: page, limit: limit }
    );
    console.log("data: ", response.data);
    return {
      data: response.data.data || [],
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Fetch Rejected Claims for Approver error " + error);
    throw error;
  }
});


export const fetchClaimByUserAsync = createAsyncThunk<
  Claim[],
  { page: number; status?: string }
>("claim/fetchUserClaim", async ({ page, status }): Promise<Claim[]> => {
  try {
    await delay(1000);
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("User id not found");
    }
    const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
      userID: userId,
      page: page,
      limit: 8,
      status: status,
    });

    return response.data.data;
  } catch (error) {
    console.error("Fetch Claims error " + error);
    throw error;
  }
});

export const fetchTotalClaimByUserAsync = createAsyncThunk<
  number,
  { status?: string }
>("claim/fetchTotalClaimByUserAsync", async ({ status }): Promise<number> => {
  try {
    await delay(1000);
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      throw new Error("User id not found");
    }
    const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
      userID: userId,
      limit: 8,
      status: status,
    });
    return response.data.totalPages;
  } catch (error) {
    console.error("Fetch Claims error " + error);
    throw error;
  }
});

export const fetchClaimByUserWithPendingStatusAsync = createAsyncThunk<
  Claim[],
  { page: number }
>(
  "claim/fetchClaimByUserWithPendingStatusAsync",
  async ({ page }): Promise<Claim[]> => {
    try {
      await delay(1000);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User id not found");
      }
      const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
        userID: userId,
        page: page,
        limit: 10,
        status: "PENDING",
      });
      return response.data.data.filter(
        (claim) => claim.claim_status === "PENDING"
      );
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);

export const fetchClaimByUserWithApprovedStatusAsync = createAsyncThunk<
  Claim[],
  { page: number }
>(
  "claim/fetchClaimByUserWithApprovedStatusAsync",
  async ({ page }): Promise<Claim[]> => {
    try {
      await delay(1000);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User id not found");
      }
      const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
        userID: userId,
        page: page,
        status: "APPROVED",
      });
      return response.data.data.filter(
        (claim) => claim.claim_status === "APPROVED"
      );
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);

export const fetchClaimByUserWithRejectStatusAsync = createAsyncThunk<
  Claim[],
  { page: number }
>(
  "claim/fetchClaimByUserWithRejectStatusAsync",
  async ({ page }): Promise<Claim[]> => {
    try {
      await delay(1000);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User id not found");
      }
      const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
        userID: userId,
        page: page,
        status: "REJECTED",
      });
      console.log(response.data.data);
      return response.data.data.filter(
        (claim) => claim.claim_status === "REJECTED"
      );
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);

// fetch claim detail by claim_id
export const fetchMyClaimDetailAsync = createAsyncThunk<MyClaimDetail, string>(
  "claim/fetchClaimDetail",
  async (request_id: string): Promise<MyClaimDetail> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<MyClaimDetail>>(
        `/claims/${request_id}`
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Fetch Claim Detail error " + error);
      throw error;
    }
  }
);

export const fetchClaimByUserWithDraftStatusAsync = createAsyncThunk<Claim[]>(
  "claim/fetchClaimByUserWithDraftStatusAsync",
  async (): Promise<Claim[]> => {
    try {
      await delay(1000);
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        throw new Error("User id not found");
      }
      const response = await httpClient.get<ApiResponse<Claim[]>>("/claims", {
        userID: userId,
      });
      return response.data.data.filter(
        (claim) => claim.claim_status === "DRAFT"
      );
    } catch (error) {
      console.error("Fetch Claims error " + error);
      throw error;
    }
  }
);
