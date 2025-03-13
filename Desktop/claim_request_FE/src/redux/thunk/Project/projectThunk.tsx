import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project } from "@/types/Project";
import { ApiResponse, ApiResponseNoGeneric } from "@/types/ApiResponse";
import { delay } from "@utils/delay";
import httpClient from "@constant/apiInstance";

export const fetchAllProjectAsync = createAsyncThunk<Project[], string>(
  "project/fetchAllProject",
  async (page: string): Promise<Project[]> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<Project[]>>(
        `/projects?page=${page}&limit=10`
      );

      console.log("API Response:", response.data); 
      console.log("Projects:", response.data.data); 

      return response.data.data; 
    } catch (error) {
      console.error("Fetch Projects error:", error);
      throw error;
    }
  }
);


export const fetchTotalPage = createAsyncThunk<number, { page: string }>(
  "project/fetchTotalPage",
  async ({ page }): Promise<number> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponseNoGeneric>("/projects", {
        params: { page: page, limit: 10 },
      });
      console.log(response.data.totalPages);
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

      console.log("Fetched project:", response.data.projects); // Kiểm tra dữ liệu

      return response.data.projects; // ✅ Lấy danh sách dự án từ API
    } catch (error) {
      console.error("Fetch Project by ID error:", error);
      throw error;
    }
  }
);


