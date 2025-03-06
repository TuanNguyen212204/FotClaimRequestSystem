import { ApiResponse } from "@/types/ApiResponse.type";
import axiosInstance from "@/constant/apiInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project } from "@/types/Project.type";
export const fetchAllProjectAsync = createAsyncThunk<Project[]>(
  "project/fetchAllProject",
  async (): Promise<Project[]> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axiosInstance.get("/projects");
      return response.data as Project[];
    } catch (error) {
      console.error("Fetch Projects error " + error);
      throw error;
    }
  }
);
