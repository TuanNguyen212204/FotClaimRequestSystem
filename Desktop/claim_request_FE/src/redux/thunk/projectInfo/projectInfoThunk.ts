// import { createAsyncThunk } from "@reduxjs/toolkit";
// import type { Project } from "@/types/Project";
// import httpClient from "@/constant/apiInstance";

// export const fetchProjectByIdAsync = createAsyncThunk<Project, string>(
//   "projectInfo/fetchProjectById",
//   async (project_id: string): Promise<Project> => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); 
//       const response = await httpClient.get<{
//         httpStatus: number;
//         errorCode: number;
//         data: Project[];
//       }>(`/projects/${project_id}`);
//       const projectData = response.data.data[0]; 
//       return {
//         projectID: projectData.projectID,
//         projectName: projectData.projectName,
//         startDate: projectData.startDate,
//         endDate: projectData.endDate,
//         projectStatus: projectData.projectStatus,
//       };
//     } catch (error) {
//       console.error("Fetch Project error: " + error);
//       throw error;
//     }
//   }
// );

// export const updateProjectAsync = createAsyncThunk<
//   Project,
//   { projectID: string; projectData: Partial<Project> }
// >("projectInfo/updateProject", async ({ projectID, projectData }): Promise<Project> => {
//   try {
//     await new Promise((resolve) => setTimeout(resolve, 1000)); 

//     const response = await httpClient.put<{
//       httpStatus: number;
//       errorCode: number;
//       data: Project;
//     }>(`/projects/${projectID}`, projectData);

//     return response.data.data;
//   } catch (error) {
//     console.error("Update Project error: " + error);
//     throw error;
//   }
// });
