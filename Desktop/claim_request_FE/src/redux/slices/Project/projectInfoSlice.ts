import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "@/types/Project";
import { fetchProjectByIdAsync } from "@/redux/thunk/Project/projectThunk";
import { updateProjectAsync } from "@/redux/thunk/projectInfo/projectInfoThunk";

interface ProjectState {
  data: Project[];
  project: Project | null;
  loading: boolean;
  error: string | null;
  totalPageOfAllProject: number;
}

const initialState: ProjectState = {
  data: [],
  project: null,
  loading: false,
  error: null,
  totalPageOfAllProject: 0,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectByIdAsync.pending, (state) => {
        console.log("✅ Redux Updated with Projects:", action.payload);
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectByIdAsync.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(fetchProjectByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch project";
      })
      .addCase(updateProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProjectAsync.fulfilled, (state, action: PayloadAction<Project>) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(updateProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update project";
      });
  },
});

export default projectSlice.reducer;
