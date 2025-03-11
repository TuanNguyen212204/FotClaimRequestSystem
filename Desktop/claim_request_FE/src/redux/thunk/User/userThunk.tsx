import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/types/User.type";
import axiosInstance from "@/constant/apiInstance";
import { ApiResponse } from "@/types/ApiResponse.type";
//Hàm này dùng để fetchAllUser
export const fetchAllUserAsync = createAsyncThunk<User[]>(
  "user/fetchAllUser",
  async (): Promise<User[]> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axiosInstance.get<ApiResponse<User[]>>(
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
