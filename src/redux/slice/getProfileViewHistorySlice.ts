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

export const getProfileViewHistoryRequest = createAsyncThunk(
  "getProfileViewHistory",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/profile-view/`;

    try {
      const response = await api.get(`${url}${payload.userId}`);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getProfileViewHistorySlice = createSlice({
  name: "getProfileViewHistory",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileViewHistoryRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProfileViewHistoryRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getProfileViewHistoryRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getProfileViewHistoryReset =
  getProfileViewHistorySlice.actions.reset;
export const getProfileViewHistorySliceReducer =
  getProfileViewHistorySlice.reducer;
