import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/types/User.type";
import axiosInstance from "@/constant/apiInstance";
//Hàm này dùng để fetchAllUser
export const fetchAllUserAsync = createAsyncThunk<User[]>(
  "user/fetchAllUser",
  async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axiosInstance.get("/admin/staffs");
      return response.data;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  }
);
//Hàm này dùng để update thông tin User
