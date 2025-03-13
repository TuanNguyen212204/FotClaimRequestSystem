import { RootState } from "@redux/index";
import { Project } from "@/types/Project";

export const selectProjectInfo = (state: RootState): Project | null =>
  state.projectsInfo.selectedProject;

export const selectProjectInfoStatus = (state: RootState): string =>
  state.projectsInfo.status;

export const selectProjectInfoError = (state: RootState): string | null =>
  state.projectsInfo.error;
