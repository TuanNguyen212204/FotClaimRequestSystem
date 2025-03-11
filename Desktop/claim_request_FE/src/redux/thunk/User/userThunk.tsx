import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/types/User";
import { ApiResponse } from "@/types/ApiResponse";
import { delay } from "@/utils/delay";
import httpClient from "@constant/apiInstance";
//Hàm này dùng để fetchAllUser
export const fetchAllUserAsync = createAsyncThunk<User[]>(
  "user/fetchAllUser",
  async (): Promise<User[]> => {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponse<User[]>>(
        "/admin/staffs"
      );
      return response.data.data;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  }
);

//Hàm này dùng để update thông tin User
