import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux";
import projectService from "@/Services/project";
import { CreateClaimData } from "@/Services/project";
import { TProjectInfo } from "@/redux/slices/Project/projectSlice";
import { ApiError } from "@/api";
export const createClaim = createAsyncThunk(
  "project/createClaim",
  async (claimData: CreateClaimData, { rejectWithValue }) => {
    try {
      const response = await projectService.createClaim(claimData);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue({
          message: error.data.message || error.message,
          code: error.data.code,
          errorCode: error.data.errorCode,
          status: error.status,
        });
      }
      return rejectWithValue(error);
    }
  },
);
export const fetchProject = createAsyncThunk(
  "project/fetchProject",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const user = state.user;
    const userId = user?.user?.user_id;
    if (!userId) {
      return rejectWithValue("User ID not found in state");
    }
    try {
      const projects = await projectService.getProjects(userId);
      const mappedProjects: TProjectInfo[] = projects.map((project) => ({
        projectID: project.project_id,
        projectName: project.project_name,
        RoleInTheProject: project.role,
        ProjectDuration: {
          from: project.start_date,
          to: project.end_date,
        },
        ProjectStatus: project.project_status,
      }));
      return { ProjectList: mappedProjects };
    } catch (error) {
      if (error instanceof ApiError) {
        return rejectWithValue({
          message: error.data.message || error.message,
          code: error.data.code,
          errorCode: error.data.errorCode,
          status: error.status,
        });
      }
      return rejectWithValue(error);
    }
  },
);
