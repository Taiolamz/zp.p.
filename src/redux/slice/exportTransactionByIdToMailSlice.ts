import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { replaceStringWithBackslach } from "../../utils";
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

export const exportTransactionByIdToMailRequest = createAsyncThunk(
  "exportTransactionByIdToMail",
  async (payload: Dictionary, { dispatch }) => {
    const { transId, email } = payload;
    const url = `admin/transactions/${transId}`;
    const transEmail = { email };
    try {
      const response = await api.post(url, transEmail);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const exportTransactionByIdToMailSlice = createSlice({
  name: "exportTransactionByIdToMail",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exportTransactionByIdToMailRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      exportTransactionByIdToMailRequest.fulfilled,
      (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      exportTransactionByIdToMailRequest.rejected,
      (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }
    );
  },
});

export const exportTransactionByIdToMailReset =
  exportTransactionByIdToMailSlice.actions.reset;
export const exportTransactionByIdToMailSliceReducer =
  exportTransactionByIdToMailSlice.reducer;
