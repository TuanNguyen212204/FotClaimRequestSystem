import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

interface Staff {
  id: string;
  staffName: string;
  department: string;
  jobRank: string;
  salary: string;
}

interface StaffState {
  staffList: Staff[];
}

const initialState: StaffState = {
  staffList: [],
};

export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaffList: (state, action: PayloadAction<Staff[]>) => {
      state.staffList = action.payload;
    },
    addStaff: (state, action: PayloadAction<Staff>) => {
      state.staffList.push(action.payload);
    },
    removeStaff: (state, action: PayloadAction<string>) => {
      state.staffList = state.staffList.filter((staff) => staff.id !== action.payload);
    },
  },
});

export const { setStaffList, addStaff, removeStaff } = staffSlice.actions;
export const selectStaff = (state: RootState) => state.staff.staffList;

export default staffSlice.reducer;
