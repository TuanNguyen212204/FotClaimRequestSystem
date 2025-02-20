import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux";
import {
  TProjectInfo,
  IProjectInfoProps,
} from "@/components/ui/Forms/Body/ProjectInfo";
import { sleep } from "@/utils/sleep";
interface IProjectSlice {
  selectedProject: TProjectInfo;
  projectList: TProjectInfo[];
  loading: fetchState;
}
type fetchState = "idle" | "pending" | "succeeded" | "failed";

const initialState: IProjectSlice = {
  selectedProject: {} as TProjectInfo,
  projectList: [],
  loading: "idle" as fetchState,
};
export const fetchProject = createAsyncThunk("project/fetchProject", async () => {
  sleep();
  return dummyProjectData;
});
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    selectedProject(state, action: PayloadAction<TProjectInfo>) {
      state.selectedProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.fulfilled, (state, action: PayloadAction<IProjectInfoProps>) => {
       state.projectList = action.payload.ProjectList.sort((a, b) =>
        a.ProjectName.localeCompare(b.ProjectName)
      );
    });
  },
  
});
export const selectProject = (state: RootState) => state.projects;
export const { selectedProject } = projectSlice.actions;
export default projectSlice.reducer;
const dummyProjectData: IProjectInfoProps = {
  ProjectList: [
    {
      ProjectName: "E-commerce Platform Development",
      RoleInTheProject: "Frontend Developer",
      ProjectDuration: {
        from: new Date("2023-01-15").toISOString(),
        to: new Date("2023-07-20").toISOString(),
      },
    },
    {
      ProjectName: "Mobile App Redesign",
      RoleInTheProject: "UI/UX Designer",
      ProjectDuration: {
        from: new Date("2022-09-01").toISOString(),
        to: new Date("2022-12-15").toISOString(),
      },
    },
    {
      ProjectName: "Data Analytics Dashboard",
      RoleInTheProject: "Data Analyst",
      ProjectDuration: {
        from: new Date("2023-03-01").toISOString(),
        to: new Date("2023-06-30").toISOString(),
      },
    },
    {
      ProjectName: "Internal CRM System",
      RoleInTheProject: "Backend Developer",
      ProjectDuration: {
        from: new Date("2022-05-10").toISOString(),
        to: new Date("2022-08-25").toISOString(),
      },
    },
    {
      ProjectName: "Marketing Website Refresh",
      RoleInTheProject: "Web Developer",
      ProjectDuration: {
        from: new Date("2023-07-01").toISOString(),
        to: new Date("2023-09-15").toISOString(),
      },
    },
    {
      ProjectName: "AI Chatbot Integration",
      RoleInTheProject: "Machine Learning Engineer",
      ProjectDuration: {
        from: new Date("2023-10-01").toISOString(),
        to: new Date("2024-01-30").toISOString(),
      },
    },
    {
      ProjectName: "Cloud Infrastructure Migration",
      RoleInTheProject: "DevOps Engineer",
      ProjectDuration: {
        from: new Date("2023-04-15").toISOString(),
        to: new Date("2023-07-20").toISOString(),
      },
    },
    {
      ProjectName: "Cybersecurity Audit",
      RoleInTheProject: "Security Analyst",
      ProjectDuration: {
        from: new Date("2022-11-01").toISOString(),
        to: new Date("2023-02-28").toISOString(),
      },
    },
    {
      ProjectName: "Project Management System Implementation",
      RoleInTheProject: "Project Manager",
      ProjectDuration: {
        from: new Date("2023-02-01").toISOString(),
        to: new Date("2023-05-15").toISOString(),
      },
    },
    {
      ProjectName: "Financial Reporting Tool Development",
      RoleInTheProject: "Software Engineer",
      ProjectDuration: {
        from: new Date("2022-07-01").toISOString(),
        to: new Date("2022-10-31").toISOString(),
      },
    },
  ],
};
