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

export const getTransactionsRequest = createAsyncThunk(
  "getTransactions",
  async (payload: any, { dispatch }) => {
    try {
      const response = await api.get("admin/transactions");
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getTransactionsSlice = createSlice({
  name: "getTransactions",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactionsRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTransactionsRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getTransactionsRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getTransactionsReset = getTransactionsSlice.actions.reset;
export const getTransactionsSliceReducer = getTransactionsSlice.reducer;
