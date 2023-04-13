import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

type Dictionary = {
  [key: string]: any;
};

interface InitState {
  data: Dictionary;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState = {
  data: {},
  status: "idle",
  error: null,
} as InitState;

export const settlementAnalyticsRequest = createAsyncThunk(
  "settlementAnalytics",
  async (payload: Dictionary, { dispatch }) => {
    const { startDate, endDate } = payload;
    const url = `admin/reconciliation/dashboard?start_date=${startDate}&end_date=${endDate}`;
    try {
      const response = await api.get(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const settlementAnalyticsSlice = createSlice({
  name: "settlementAnalytics",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(settlementAnalyticsRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(settlementAnalyticsRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(settlementAnalyticsRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const settlementAnalyticsReset = settlementAnalyticsSlice.actions.reset;
export const settlementAnalyticsSliceReducer = settlementAnalyticsSlice.reducer;
