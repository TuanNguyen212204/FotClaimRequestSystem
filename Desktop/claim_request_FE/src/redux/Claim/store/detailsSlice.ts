import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface ListClaims {
    id: string,
    otDuration: string,
    otDate: string,
    hours: number,
    status: string,
}

interface DetailsState {
    listClaims: ListClaims[],
}

const initialState: DetailsState = {
    listClaims: [],
}

export const fetchAllDetails = createAsyncThunk("details/fetchAllDetails", async () => {
    const res = await axios.get(`https://67263146302d03037e6cb422.mockapi.io/pendingDetails`);
    console.log("Data", res.data);
    return res.data;
});

export const detailsSlice = createSlice({
    name: "details",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllDetails.fulfilled, (state, action) => {
            state.listClaims = action.payload;
        });
    }
});

export default detailsSlice.reducer;
