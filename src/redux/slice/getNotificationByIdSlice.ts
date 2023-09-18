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

export const getNotificationByIdRequest = createAsyncThunk(
  "getNotificationById",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/custom-notifications/${payload.notificationId}`;

    try {
      const response = await api.get(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getNotificationByIdSlice = createSlice({
  name: "getNotificationById",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationByIdRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getNotificationByIdRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getNotificationByIdRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getNotificationByIdReset = getNotificationByIdSlice.actions.reset;
export const getNotificationByIdSliceReducer = getNotificationByIdSlice.reducer;
