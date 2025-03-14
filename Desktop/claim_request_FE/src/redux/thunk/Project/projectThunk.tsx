import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project } from "@/types/Project";
import { ApiResponse, ApiResponseNoGeneric } from "@/types/ApiResponse";
import { delay } from "@utils/delay";
import httpClient from "@constant/apiInstance";
import { log } from "node:console";

export const fetchAllProjectAsync = createAsyncThunk<Project[], string>(
  "project/fetchAllProject",
  async (page: string): Promise<Project[]> => {
    try {
      await delay(1000);
      console.log("page", page);
      
      const response = await httpClient.get<ApiResponse<Project[]>>(
        `/projects?page=${page}&limit=5`
      );

      

      if (!response.data.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid data format from API');
      }

      return response.data.data;
    } catch (error) {
      console.error("Fetch Projects error:", error);
      throw error;
    }
  }
);


export const fetchTotalPage = createAsyncThunk<number, { page: number }>(
  "project/fetchTotalPage",
  async ({ page }): Promise<number> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<Project[]>>(
        `/projects?page=${page}&limit=5`
      );
      console.log("response", response.data);
      console.log("total Page:",response.data.totalPages);
      return response.data.totalPages; // Đúng key "totalPages"
    } catch (error) {
      console.error("Fetch Project error " + error);
      throw error;
    }
  }
);

export const fetchProjectByIdAsync = createAsyncThunk<Project[], string>(
  "project/fetchProjectByIdAsync",
  async (id: string): Promise<Project[]> => {
    try {
      const response = await httpClient.get<ApiResponse<Project[]>>(`/projects/${id}`);
      
      if (!response.data.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid data format from API');
      }

      return response.data.data;
    } catch (error) {
      console.error("Fetch Project by ID error:", error);
      throw error;
    }
  }
);


