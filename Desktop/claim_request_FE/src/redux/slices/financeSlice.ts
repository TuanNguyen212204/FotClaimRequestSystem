import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/index";
import axios from "axios";

interface ListClaims {
  claimId: string;
  staffName: string;
  projectName: string;
  startAt: string;
  finishAt: string;
  hour: number;
  approverName: string;
}

// Define a type for the slice state
interface FinanceState {
  listClaims: ListClaims[];
}

// Define the initial state using that type
const initialState: FinanceState = {
  listClaims: [],
};

export const fetchAllClaims = createAsyncThunk(
  `finances/fetAllClaims`,
  async () => {
    const res = await axios.get(
      `https://67aee7009e85da2f020eb799.mockapi.io/ot/claims`
    );
    console.log("Data: ", res.data);
    return res.data;
  }
);

export const financeSlice = createSlice({
  name: "finance",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllClaims.pending, (state, action) => {})
      .addCase(fetchAllClaims.fulfilled, (state, action) => {
        state.listClaims = action.payload;
      })
      .addCase(fetchAllClaims.rejected, (state, action) => {});
  },
});

export default financeSlice.reducer;
