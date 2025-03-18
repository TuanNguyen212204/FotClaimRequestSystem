import { getAllProjects } from "../thunk/CreateClaim";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
export interface Project {
  project_id: string;
  project_name: string;
  start_date: string;
  end_date: string;
  project_status: number;
}
interface vySlice {
  loading: boolean;
  ProjectList: Project[];
}
const initialState: vySlice = {
  loading: false,
  ProjectList: [],
};
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.ProjectList = action.payload.data;
      })
      .addCase(getAllProjects.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default projectSlice.reducer;
export const allProject = (state: RootState) => state.vy.ProjectList;
