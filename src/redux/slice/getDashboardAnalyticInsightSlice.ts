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

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDashboardAnalyticInsight.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getDashboardAnalyticInsight.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        });
        builder.addCase(getDashboardAnalyticInsight.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },

})

export const getDashboardAnalyticInsight = createAsyncThunk(
    'getAllTransactions',
    async (payload: Dictionary, { dispatch }) => {
      const { user_type, transaction_type, start_date, end_date } = payload;
      const url = `admin/dashboard/insights?start_date=${start_date}&end_date=${end_date}&user_type=${user_type}&transaction_type=${transaction_type}`;
  
      try {
        const response = await api.get(`${url}`);
        return response?.data;
      } catch (err) {
        throw err;
      }
    },
  );

export const dashboardAnalyticReset = dashboardSlice.actions.reset
export const dashboardSliceReducer = dashboardSlice.reducer