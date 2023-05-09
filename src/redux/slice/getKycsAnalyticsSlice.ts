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

export const getKycsAnalyticsRequest = createAsyncThunk(
  "getKycsAnalytics",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/kycs/count?type=`;

    try {
      const response = await api.get(`${url}${payload.kycType}`);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getKycsAnalyticsSlice = createSlice({
  name: "getKycsAnalytics",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getKycsAnalyticsRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getKycsAnalyticsRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getKycsAnalyticsRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getKycsAnalyticsReset = getKycsAnalyticsSlice.actions.reset;
export const getKycsAnalyticsSliceReducer = getKycsAnalyticsSlice.reducer;
