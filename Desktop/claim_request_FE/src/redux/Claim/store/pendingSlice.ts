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

export const fetchAllClaims = createAsyncThunk("pending/fetchAllClaims", async () => {
    const res = await axios.get(`https://67263146302d03037e6cb422.mockapi.io/pending`);
    console.log("Data", res.data);
    return res.data;
});

export const deleteClaim = createAsyncThunk("pending/deleteClaim", async (id: string, { rejectWithValue }) => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
        const res = await axios.delete(`https://67263146302d03037e6cb422.mockapi.io/pending/${id}`);
        console.log("Data", res.data);
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
})


