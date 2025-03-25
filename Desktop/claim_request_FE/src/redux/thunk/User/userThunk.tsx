import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/types/User";
import { ApiResponse, ApiResponseNoGeneric } from "@/types/ApiResponse";
import { delay } from "@utils/delay";
import httpClient from "@constant/apiInstance";
//Hàm này dùng để fetchAllUser
export const fetchAllUserAsync = createAsyncThunk<User[], string>(
  "user/fetchAllUser",
  async (page: string): Promise<User[]> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<User[]>>(
        "/admin/staffs",
        { page: page }
      );
      return response.data.data;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  }
);
export const fetchTotalPage = createAsyncThunk<number, { page: string }>(
  "user/fetchTotalPage",
  async ({ page }): Promise<number> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponseNoGeneric>(
        "/admin/staffs",
        { page: page }
      );
      return response.data.totalPages;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  }
);

export const fetchUserByIdAsync = createAsyncThunk<User[]>(
  "user/fetchUserByIdAsync",
  async (): Promise<User[]> => {
    try {
      const id = localStorage.getItem("user_id");
      const response = await httpClient.get<ApiResponse<User[]>>(
        "/admin/staff/" + id
      );
      return response.data.data;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  }
);
