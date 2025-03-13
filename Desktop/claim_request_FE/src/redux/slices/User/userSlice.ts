import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import httpClient from "@/constant/apiInstance";

interface Staff {
  id: string; // Đổi từ user_id thành id
  name: string; // Đổi từ full_name thành name
  email: string;
  department: string;
  jobRank: string; // Đổi từ job_rank thành jobRank để phù hợp với component Table
}

interface StaffState {
  data: Staff[];
  loading: boolean;
}

const initialState: StaffState = {
  data: [],
  loading: false,
};

export const fetchStaffAsync = createAsyncThunk("staff/fetchStaffAsync", async (_, { rejectWithValue }) => {
  try {
    const response = await httpClient.get<{ httpStatus: number; data: Staff[] }>("/admin/staffs");
    if (response.data.httpStatus === 200) {
      return response.data.data.map((staff) => ({
        ...staff,
        id: staff.user_id, // Chuyển user_id thành id
        name: staff.full_name, // Chuyển full_name thành name
        jobRank: staff.job_rank, // Chuyển job_rank thành jobRank
      }));
    } else {
      message.error("Failed to fetch staff data.");
      return rejectWithValue("Failed to fetch staff data.");
    }
  } catch (error) {
    message.error("An error occurred while fetching staff data.");
    return rejectWithValue(error);
  }
});

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaffAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStaffAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default staffSlice.reducer;
