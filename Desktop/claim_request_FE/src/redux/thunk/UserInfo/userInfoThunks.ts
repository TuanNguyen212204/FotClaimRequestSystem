import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "@/types/User";
import httpClient from "@/constant/apiInstance";


export const fetchUserByIdAsync = createAsyncThunk<User, string>(
  "userInfo/fetchUserById",
  async (userId: string): Promise<User> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      const response = await httpClient.get<{
        httpStatus: number;
        errorCode: number;
        data: User[];
      }>(`/admin/staff/${userId}`);
      const userData = response.data.data[0]; 
      return {
        user_id: userData.user_id,
        username: userData.username,
        email: userData.email,
        hash_password: userData.hash_password,
        full_name: userData.full_name,
        department: userData.department,
        job_rank: userData.job_rank,
        salary: userData.salary,
        role_id: userData.role_id,
        user_status: userData.user_status,
        role_name: userData.role_name,
      };
    } catch (error) {
      console.error("Fetch User error: " + error);
      throw error;
    }
  }
);


export const updateUserAsync = createAsyncThunk<
  User,
  { userId: string; userData: Partial<User> }
>("userInfo/updateUser", async ({ userId, userData }): Promise<User> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); 

    const requestBody = {
      full_name: userData.full_name || "",
      email: userData.email || "",
      department: userData.department || "",
      role_id: userData.role_id || 0,
      job_rank: userData.job_rank || "",
    };
 
    if (userData.password && userData.password.trim() !== "") {
      requestBody.password = userData.password;
    }

    const response = await httpClient.put<{
      httpStatus: number;
      errorCode: number;
      data: User[];
    }>(`/admin/staff/${userId}`, requestBody);
    const updatedUser = response.data.data[0]; 
    return {
      user_id: updatedUser.user_id,
      username: updatedUser.username,
      email: updatedUser.email,
      hash_password: updatedUser.hash_password,
      full_name: updatedUser.full_name,
      department: updatedUser.department,
      job_rank: updatedUser.job_rank,
      salary: updatedUser.salary,
      role_id: updatedUser.role_id,
      user_status: updatedUser.user_status,
      role_name: updatedUser.role_name,
    };
  } catch (error) {
    console.error("Update User error: " + error);
    throw error;
  }
});
