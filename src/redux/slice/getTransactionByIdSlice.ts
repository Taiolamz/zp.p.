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

export const getTransactionByIdRequest = createAsyncThunk(
  "getTransactionById",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/transactions/${payload.userId}`;

    try {
      const response = await api.get(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getTransactionByIdSlice = createSlice({
  name: "getTransactionById",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTransactionByIdRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getTransactionByIdRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getTransactionByIdRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getTransactionByIdReset = getTransactionByIdSlice.actions.reset;
export const getTransactionByIdSliceReducer = getTransactionByIdSlice.reducer;
