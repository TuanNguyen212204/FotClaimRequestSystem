import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/types/User";
import { ApiResponse } from "@/types/ApiResponse";
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
      console.log(response.data.data);
      return response.data.data;
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
      console.log("user_id" + id);
      await delay(1000);
      const response = await httpClient.get<ApiResponse<User[]>>(
        "/admin/staff/" + id
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  }
);
