import { createSlice } from '@reduxjs/toolkit';
import { Project } from '@/types/Project';
import { fetchAllProjectAsync, fetchProjectByIdAsync, fetchTotalPage } from '../thunk/Project/projectThunk';

interface IProjectSlice {
  data: Project[];
  project: Project | null;
  totalPageOfAllProject: number;
  loading: boolean;
  error: string | null;
}

const initialState: IProjectSlice = {
  data: [],
  project: null,
  totalPageOfAllProject: 1,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchAllProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProjectAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      })
      // Fetch project by ID
      .addCase(fetchProjectByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectByIdAsync.fulfilled, (state, action) => {
        state.project = Array.isArray(action.payload) ? action.payload[0] : null;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProjectByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch project';
      })
      // Fetch total pages
      .addCase(fetchTotalPage.fulfilled, (state, action) => {
        state.totalPageOfAllProject = action.payload;
      });
  },
});

export default projectSlice.reducer; 