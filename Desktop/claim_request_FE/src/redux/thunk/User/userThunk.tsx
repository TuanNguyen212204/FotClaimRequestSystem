import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/types/User";
import { ApiResponse, ApiResponseNoGeneric } from "@/types/ApiResponse";
import { delay } from "@utils/delay";
import httpClient from "@constant/apiInstance";
//Hàm này dùng để fetchAllUser
export const fetchAllUserAsync = createAsyncThunk<
  User[],
  { page: string; department_id: number }
>("user/fetchAllUser", async ({ page, department_id }): Promise<User[]> => {
  if (department_id === 0) {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponseNoGeneric>(
        "/admin/staffs",
        { page: page }
      );
      console.log(response.data.totalPages);
      return response.data.data;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  } else {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponseNoGeneric>(
        "/admin/staffs",
        { page: page, department_id: department_id }
      );
      console.log(response.data.totalPages);
      return response.data.data;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  }
});
export const fetchTotalPage = createAsyncThunk<
  number,
  { page: string; department_id: number }
>("user/fetchTotalPage", async ({ page, department_id }): Promise<number> => {
  if (department_id === 0) {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponseNoGeneric>(
        "/admin/staffs",
        { page: page }
      );
      console.log(response.data.totalPages);
      return response.data.totalPages;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  } else {
    try {
      await delay(1000);
      const response = await httpClient.get<ApiResponseNoGeneric>(
        "/admin/staffs",
        { page: page, department_id: department_id }
      );
      console.log(response.data.totalPages);
      return response.data.totalPages;
    } catch (error) {
      console.error("Fetch Users error " + error);
      throw error;
    }
  }
});

export const fetchUserByIdAsync = createAsyncThunk<User[]>(
  "user/fetchUserByIdAsync",
  async (): Promise<User[]> => {
    try {
      const id = localStorage.getItem("user_id");
      console.log("user_id" + id);
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
