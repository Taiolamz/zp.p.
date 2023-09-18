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

export const getNotificationRequest = createAsyncThunk(
  "getNotification",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/custom-notifications?type=${payload.type}`;

    try {
      const response = await api.get(`${url}`, {
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

const getNotificationSlice = createSlice({
  name: "getNotification",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getNotificationRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getNotificationRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getNotificationReset = getNotificationSlice.actions.reset;
export const getNotificationSliceReducer = getNotificationSlice.reducer;
