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

export const getKycsRequest = createAsyncThunk(
  "getKycs",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/kycs`;

    try {
      // const response = await api.get(`${url}${payload.kycLevel}`);
      const response = await api.get(`${url}${payload.kycLevel}`, {
        params: {
          per_page: payload.per_page,
          page: payload.page,
        },
      });
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getKycsSlice = createSlice({
  name: "getKycs",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getKycsRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getKycsRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getKycsRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getKycsReset = getKycsSlice.actions.reset;
export const getKycsSliceReducer = getKycsSlice.reducer;
