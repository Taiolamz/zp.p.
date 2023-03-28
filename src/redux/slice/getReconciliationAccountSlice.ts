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

export const getReconciliationAccountRequest = createAsyncThunk(
  "getReconciliationAccount",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/reconciliation/account`;

    try {
      const response = await api.get(url, {
        data: {
          search: payload.search,
        },
      });
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getReconciliationAccountSlice = createSlice({
  name: "getReconciliationAccount",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReconciliationAccountRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getReconciliationAccountRequest.fulfilled,
      (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      getReconciliationAccountRequest.rejected,
      (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }
    );
  },
});

export const getReconciliationAccountSliceReset =
  getReconciliationAccountSlice.actions.reset;
export const getReconciliationAccountSliceReducer =
  getReconciliationAccountSlice.reducer;
