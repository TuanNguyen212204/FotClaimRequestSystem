import { RootState } from "@redux/index";

export const selectAllProject = (state: RootState) => state.projects.data;
export const selectProjectById = (state: RootState) => state.projects.project;
export const selectTotalPageOfAllProject = (state: RootState) =>
  state.projects.totalPageOfAllProject;