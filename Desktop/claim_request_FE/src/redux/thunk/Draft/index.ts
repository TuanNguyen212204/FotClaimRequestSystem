import { createAsyncThunk } from "@reduxjs/toolkit";
import draftService from "@/Services/Draft";
import { ApiError } from "@/api";

const fetchClaims = createAsyncThunk(
  "draft/fetchClaims",
  async (requestID: string, { rejectWithValue }) => {
    try {
      const response = await draftService.getClaims(requestID);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue({
          message: error.message,
          code: error.status,
          errorCode: error.data.errorCode,
          status: error.status,
        });
      }
      return rejectWithValue(error);
    }
  }
);
export default fetchClaims;
