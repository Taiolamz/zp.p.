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

export const getUserVerificationsRequest = createAsyncThunk(
  "getUserVerifications",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/users/`;

    try {
      const response = await api.get(`${url}${payload.userId}/verifications`);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getUserVerificationsSlice = createSlice({
  name: "getUserVerifications",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserVerificationsRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserVerificationsRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getUserVerificationsRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getUserVerificationsReset =
  getUserVerificationsSlice.actions.reset;
export const getUserVerificationsSliceReducer =
  getUserVerificationsSlice.reducer;
