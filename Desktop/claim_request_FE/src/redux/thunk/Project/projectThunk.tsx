import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project } from "@/types/Project";
import { ApiResponse, ApiResponseNoGeneric } from "@/types/ApiResponse";
import { delay } from "@utils/delay";
import httpClient from "@constant/apiInstance";

export const fetchAllProjectAsync = createAsyncThunk<
  Project[],
  { page: string; status: string }
>("project/fetchAllProject", async ({ page, status }): Promise<Project[]> => {
  try {
    await delay(1000);
    console.log("Fetching projects - Page:", page, "Status:", status);

    const response = await httpClient.get<ApiResponse<Project[]>>(
      `/projects?project_status=${status}&page=${page}&limit=10&sortBy=project_id&order=ASC`
    );

    if (!response.data.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid data format from API");
    }

    return response.data.data;
  } catch (error) {
    console.error("Fetch Projects error:", error);
    throw error;
  }
});

export const fetchTotalPage = createAsyncThunk<
  number,
  { page: number; status: string }
>("project/fetchTotalPage", async ({ page, status }): Promise<number> => {
  try {
    await delay(1000);
    const response = await httpClient.get<ApiResponse<Project[]>>(
      `/projects?project_status=${status}&page=1&limit=10&sortBy=project_id&order=ASC`
    );

    console.log("response", response.data);
    console.log("Total Pages:", response.data.totalPages);

    return response.data.totalPages;
  } catch (error) {
    console.error("Fetch Project error", error);
    throw error;
  }
});

export const fetchProjectByIdAsync = createAsyncThunk<Project[], string>(
  "project/fetchProjectByIdAsync",
  async (id: string): Promise<Project[]> => {
    try {
      const response = await httpClient.get<ApiResponse<Project[]>>(
        `/projects/${id}`
      );

      if (!response.data.data || !Array.isArray(response.data.data)) {
        throw new Error("Invalid data format from API");
      }

      return response.data.data;
    } catch (error) {
      console.error("Fetch Project by ID error:", error);
      throw error;
    }
  }
);
