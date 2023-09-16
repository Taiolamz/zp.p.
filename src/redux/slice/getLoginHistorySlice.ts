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

export const getLoginHistoryRequest = createAsyncThunk(
  "getLoginHistory",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/users/`;

    try {
      const response = await api.get(`${url}${payload.userId}/login-history`);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getLoginHistorySlice = createSlice({
  name: "getLoginHistory",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginHistoryRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getLoginHistoryRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getLoginHistoryRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getLoginHistoryReset = getLoginHistorySlice.actions.reset;
export const getLoginHistorySliceReducer = getLoginHistorySlice.reducer;
