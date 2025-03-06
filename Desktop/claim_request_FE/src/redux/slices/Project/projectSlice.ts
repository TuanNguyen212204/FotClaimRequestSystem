import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux";
import projectService from "@/Services/projectService";
export type TProjectInfo = {
  ProjectID: string;
  ProjectName: string;
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
}

const initialState: IProjectSlice = {
  selectedProject: null,
  projectList: [],
  loading: "idle",
};

export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async (_, { rejectWithValue }) => {
    try {
      const projects = await projectService.getProjects();
      const mappedProjects: TProjectInfo[] = projects.map((project) => ({
        ProjectID: project.projectID,
        ProjectName: project.projectName,
        RoleInTheProject: project.role || "", // TODO : THONG BAO BE HIEN TAI API KHONG TRA VE ROLE TUNG NGUOW PHAI CO MOT ROLE RIENG TORNG TUNG PROENCT
        ProjectDuration: {
          from: project.startDate,
          to: project.endDate,
        },
        ProjectStatus: project.projectStatus,
      }));
      return { ProjectList: mappedProjects };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    selectedProject(state, action: PayloadAction<TProjectInfo>) {
      state.selectedProject = action.payload;
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
            a.ProjectName.localeCompare(b.ProjectName),
          );
          state.loading = "succeeded";
        },
      )
      .addCase(fetchProject.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const selectProject = (state: RootState) => state.projects;
export const { selectedProject } = projectSlice.actions;
export default projectSlice.reducer;
