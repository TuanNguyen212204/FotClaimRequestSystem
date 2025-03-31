import { createSlice } from "@reduxjs/toolkit";
import { FormData } from "@/types/claimForm.type";
import { PayloadAction } from "@reduxjs/toolkit";
import { Claim } from "@/Services/Draft/Draft.type";
import fetchClaims from "@/redux/thunk/Draft";
interface UpdateDraftState {
  initialValues?: FormData;
  requestID?: string;
}
const initialState: UpdateDraftState = {
  initialValues: undefined,
  requestID: undefined,
};
const updateDraftSlice = createSlice({
  name: "updateDraft",
  initialState,
  reducers: {
    setInitialValues(state, action: PayloadAction<FormData>) {
      state.initialValues = action.payload;
    },
    setRequestID(state, action: PayloadAction<string>) {
      state.requestID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClaims.pending, (state) => {
        state.initialValues = undefined;
        state.requestID = undefined;
      })
      .addCase(
        fetchClaims.fulfilled,
        (state, action: PayloadAction<Claim[]>) => {
          const { request_id, project, claimDetailsWithSalaryOvertimePerDay } =
            action.payload[0];
          state.requestID = request_id;

          state.initialValues = {
            currentSelectedProject: {
              projectName: project.project_name,
              ProjectDuration: {
                from: project.start_date.split("T")[0],
                to: project.end_date.split("T")[0],
              },
              projectID: project.project_id,
            },
            claims: claimDetailsWithSalaryOvertimePerDay.map((claim) => ({
              date: claim.date.split("T")[0],
              working_hours: claim.working_hours,
            })),
          };
        }
      );
  },
});
export const selectInitialValues = (state: { draft: UpdateDraftState }) =>
  state.draft.initialValues;
export const selectRequestID = (state: { draft: UpdateDraftState }) =>
  state.draft.requestID;
export const selectDraft = (state: { draft: UpdateDraftState }) => state.draft;
export const { setInitialValues, setRequestID } = updateDraftSlice.actions;
export default updateDraftSlice.reducer;
