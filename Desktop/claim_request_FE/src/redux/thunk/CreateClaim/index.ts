import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux";
import projectService from "@/Services/Project";
import { CreateClaimData } from "@/Services/Project/Project.type";
import { TProjectInfo } from "@/redux/slices/Project/projectSlice";
import { ApiError } from "@/api";
import { projectsParamOptions } from "@/Services/Project/Project.type";
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
export const updateClaim = createAsyncThunk(
  "project/updateClaim",
  async (
    payload: { claimData: CreateClaimData; requestID: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await projectService.updateClaim(
        payload.claimData,
        payload.requestID,
      );
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
  },
);
export const fetchProjectByID = createAsyncThunk(
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
export const getAllProjects = createAsyncThunk(
  "project/getAllProjects",
  async (options: projectsParamOptions, { rejectWithValue }) => {
    try {
      const response = await projectService.getAllProjects(options);
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
