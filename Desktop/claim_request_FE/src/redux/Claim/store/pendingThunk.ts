import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ListClaims {
    id: string,
    staffName: string,
    projectName: string,
    duration: string,
    hours: number,
    approveName: string,
}

interface PendingState {
    listClaims: ListClaims[],
}

const initialState: PendingState = {
    listClaims: [],
}

export const fetchAllClaims = createAsyncThunk("finance/fetchAllClaims", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/finance/claims`);
    return res.data;
});

export const deleteClaim = createAsyncThunk("pending/deleteClaim", async (id: string, { rejectWithValue }) => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/finance/claims/${id}`);
        return id;
    } else {
        return rejectWithValue("User cancelled the deletion");
    }
});

export const pendingSlice = createSlice({
    name: "pending",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllClaims.fulfilled, (state, action) => {
            state.listClaims = action.payload;
        });
        builder.addCase(deleteClaim.fulfilled, (state, action) => {
            state.listClaims = state.listClaims.filter(claim => claim.id !== action.payload);
        });
    }
});

export default pendingSlice.reducer;


