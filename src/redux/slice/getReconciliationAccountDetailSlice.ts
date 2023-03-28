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

export const getReconciliationAccountDetailRequest = createAsyncThunk(
  "getReconciliationAccountDetail",
  async (payload: Dictionary, { dispatch }) => {
    const url = `reconciliation/account/`;

    try {
      const response = await api.get(url, {
        params: {
          userId: payload.userId,
        },
      });
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getReconciliationAccountDetailSlice = createSlice({
  name: "getReconciliationAccountDetail",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReconciliationAccountDetailRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getReconciliationAccountDetailRequest.fulfilled,
      (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(
      getReconciliationAccountDetailRequest.rejected,
      (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }
    );
  },
});

export const getReconciliationAccountDetailSliceReset =
  getReconciliationAccountDetailSlice.actions.reset;
export const getReconciliationAccountDetailSliceReducer =
  getReconciliationAccountDetailSlice.reducer;
