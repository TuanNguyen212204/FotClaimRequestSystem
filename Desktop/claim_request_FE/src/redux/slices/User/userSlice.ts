import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import httpClient from "@/constant/apiInstance";

interface Staff {
  user_id: string;
  full_name: string;
  email: string;
  department: string;
  job_rank: string;
}

interface StaffState {
  staffList: Staff[];
  loading: boolean;
}

const initialState: StaffState = {
  staffList: [],
  loading: false,
};

export const fetchStaff = createAsyncThunk("staff/fetchStaff", async (_, { rejectWithValue }) => {
  try {
    const response = await httpClient.get<{ httpStatus: number; data: Staff[] }>("/admin/staffs");
    if (response.data.httpStatus === 200) {
      return response.data.data;
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
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })
      .addCase(fetchStaff.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default staffSlice.reducer;
