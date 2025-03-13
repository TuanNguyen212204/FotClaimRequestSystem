import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux";
import { fetchProject, createClaim } from "@/redux/thunk/CreateClaim";
export type TProjectInfo = {
  projectID: string;
  projectName: string;
  RoleInTheProject: string;
  ProjectDuration: {
    from: string;
    to: string;
  };
  ProjectStatus?: number;
};

interface ProjectListResponse {
  ProjectList: TProjectInfo[];
}
interface IProjectSlice {
  selectedProject: TProjectInfo | null;
  projectList: TProjectInfo[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  claimCreationStatus: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: IProjectSlice = {
  selectedProject: null,
  projectList: [],
  loading: "idle",
  claimCreationStatus: "idle",
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    selectedProject(state, action: PayloadAction<TProjectInfo>) {
      state.selectedProject = action.payload;
    },
    setLoading(state, action: PayloadAction<IProjectSlice["loading"]>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProject.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(
        fetchProject.fulfilled,
        (state, action: PayloadAction<ProjectListResponse>) => {
          state.projectList = action.payload.ProjectList.sort((a, b) =>
            a.projectName.localeCompare(b.projectName),
          );
          state.loading = "succeeded";
        },
      )
      .addCase(fetchProject.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createClaim.pending, (state) => {
        state.claimCreationStatus = "pending";
      })
      .addCase(createClaim.fulfilled, (state) => {
        state.claimCreationStatus = "succeeded";
      })
      .addCase(createClaim.rejected, (state) => {
        state.claimCreationStatus = "failed";
      });
  },
});

export const selectProject = (state: RootState) => state.projects;
export const isProjectLoading = (state: RootState) =>
  state.projects.loading === "pending";
export const isClaimCreationLoading = (state: RootState) =>
  state.projects.claimCreationStatus === "pending";
export const { selectedProject, setLoading } = projectSlice.actions;
export default projectSlice.reducer;
