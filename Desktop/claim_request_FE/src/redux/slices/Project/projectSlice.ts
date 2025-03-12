import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux";
import projectService from "@/Services/projectService";
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
        projectID: project.project_id,
        projectName: project.project_name,
        RoleInTheProject: project.role || "", // TODO : THONG BAO BE HIEN TAI API KHONG TRA VE ROLE TUNG NGUOW PHAI CO MOT ROLE RIENG TORNG TUNG PROENCT
        ProjectDuration: {
          from: project.start_date,
          to: project.end_date,
        },
        ProjectStatus: project.project_status,
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
          console.log(action.payload.ProjectList, "action.payload.ProjectList");
          state.projectList = action.payload.ProjectList.sort((a, b) =>
            a.projectName.localeCompare(b.projectName),
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
