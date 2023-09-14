import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dictionary } from "../../types";
import api from "../../api/api";

interface InitState {
    data: Dictionary;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: any;
}
const initialState: InitState = {
    data: {},
    status: 'idle',
    error: null
}

const transactionVolumeSlice = createSlice({
    name: 'transaction_volume',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTransactionVolume.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getTransactionVolume.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        });
        builder.addCase(getTransactionVolume.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
})


export const getTransactionVolume = createAsyncThunk(
    'getTransactionVolume',
    async (payload: Dictionary, { dispatch }) => {
        const { start_date, end_date } = payload;
        const url = `admin/dashboard/transaction-volume?start_date=${start_date}&end_date=${end_date}`;

        try {
            const response = await api.get(`${url}`);
            return response?.data;
        } catch (err) {
            throw err;
        }
    },
);

export const transactionVolumeReset = transactionVolumeSlice.actions.reset
export const transactionVolumeSliceReducer = transactionVolumeSlice.reducer