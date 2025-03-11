import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "@/types/User";
// import httpClient from "@/constant/apiInstance";
// import { ApiResponse } from "@/types/ApiResponse.type";

export const fetchUserByIdAsync = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("user/fetchUserById", async (userId: string, { rejectWithValue }) => {
  try {
    const response = await axios.get<User>(
      `https://67be8a29b2320ee0501072e3.mockapi.io/userInfo/${userId}`
    );
    return response.data;

    // const repsonse = await httpClient.get<ApiResponse<User>>(
    //   `/users/${userId}`
    // );
    // return repsonse.data.data;
  } catch (error: any) {
    return rejectWithValue("Fetch user error: " + error.message);
  }
});

export const fetchAllUsersAsync = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("user/fetchAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<User[]>(
      "https://67be8a29b2320ee0501072e3.mockapi.io/userInfo"
    );
    return response.data;

    // const response = await httpClient.get<ApiResponse<User[]>>("/users");
    // return response.data.data;
  } catch (error: any) {
    return rejectWithValue("Fetch users error: " + error.message);
  }
});

export const updateUserAsync = createAsyncThunk<
  User,
  { userId: string; userData: User },
  { rejectValue: string }
>(
  "user/updateUser",
  async ({ userId, userData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put<User>(
        `https://67be8a29b2320ee0501072e3.mockapi.io/userInfo/${userId}`,
        userData
      );
      await dispatch(fetchUserByIdAsync(userId));
      return response.data;

      // const response = await httpClient.put<ApiResponse<User>>(
      //   `/users/${userId}`,
      //   userData
      // );
      // await dispatch(fetchUserByIdAsync(userId));
      // return response.data.data;
    } catch (error: any) {
      return rejectWithValue("Update user error: " + error.message);
    }
  }
);
