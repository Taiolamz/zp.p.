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

export const reconcileAccountRequest = createAsyncThunk(
  "reconcileAccount",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/reconciliation/account/reconcile`;
    try {
      const response = await api.post(url, payload);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const reconcileAccountSlice = createSlice({
  name: "reconcileAccount",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reconcileAccountRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(reconcileAccountRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(reconcileAccountRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const reconcileAccountReset = reconcileAccountSlice.actions.reset;
export const reconcileAccountSliceReducer = reconcileAccountSlice.reducer;
