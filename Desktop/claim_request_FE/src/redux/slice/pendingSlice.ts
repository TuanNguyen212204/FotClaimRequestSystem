import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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

export const fetchAllClaims = createAsyncThunk("pending/fetchAllClaims", async () => {
    const res = await axios.get(`https://67263146302d03037e6cb422.mockapi.io/pending`);
    console.log("Data", res.data);
    return res.data;
});

export const pendingSlice = createSlice({
    name: "pending",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllClaims.fulfilled, (state, action) => {
            state.listClaims = action.payload;
        });
    }
})


