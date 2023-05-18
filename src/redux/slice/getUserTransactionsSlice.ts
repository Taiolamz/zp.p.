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

export const getUserTransactionsRequest = createAsyncThunk(
  "getUserTransactions",
  async (payload: Dictionary, { dispatch }) => {
    const { userId, start_date, end_date, per_page, page } = payload;
    const url = `admin/reconciliation/account/`;

    try {
      const response = await api.get(`${url}${userId}/history`, {
        params: {
          start_date,
          end_date,
          per_page,
          page,
        },
      });
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getUserTransactionsSlice = createSlice({
  name: "getUserTransactions",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserTransactionsRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserTransactionsRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getUserTransactionsRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getUserTransactionsReset = getUserTransactionsSlice.actions.reset;
export const getUserTransactionsSliceReducer = getUserTransactionsSlice.reducer;
