import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  name: string;
  description: string;
  status: string;
}

const initialState: ProjectState = {
  name: "",
  description: "",
  status: "pending",
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectInfo: (state, action: PayloadAction<ProjectState>) => {
      return action.payload;
    },
    updateProjectName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setProjectInfo, updateProjectName } = projectSlice.actions;
export default projectSlice.reducer;
