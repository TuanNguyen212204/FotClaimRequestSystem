import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 
import { User, Experience } from "@types/User.type"; 


export const fetchUserByIdAsync = createAsyncThunk<User, string, { rejectValue: string }>(
  "user/fetchUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<User>(
        `https://67be8a29b2320ee0501072e3.mockapi.io/userInfo/${userId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Fetch user error: " + error.message);
    }
  }
);


export const fetchAllUsersAsync = createAsyncThunk<User[], void, { rejectValue: string }>(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User[]>(
        "https://67be8a29b2320ee0501072e3.mockapi.io/userInfo"
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Fetch users error: " + error.message);
    }
  }
);


export const updateUserAsync = createAsyncThunk<User, { userId: string; userData: User }, { rejectValue: string }>(
  "user/updateUser",
  async ({ userId, userData }, { rejectWithValue, dispatch }) => {
    try {

      const response = await axios.put<User>(
        `https://67be8a29b2320ee0501072e3.mockapi.io/userInfo/${userId}`,
        userData
      );
      

      await dispatch(fetchUserByIdAsync(userId));
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Update user error: " + error.message);
    }
  }
);