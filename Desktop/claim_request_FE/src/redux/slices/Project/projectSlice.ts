import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "@/types/Project.type";
import { fetchAllProjectAsync } from "@/redux/thunk/Project/projectThunk";

const initialState: {
  data: Project[];
  status: string;
  error: string | null;
} = {
  data: [],
  status: "",
  error: null,
};
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProjectAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.error.message);
      })
      .addCase(fetchAllProjectAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProjectAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});
export default projectSlice.reducer;