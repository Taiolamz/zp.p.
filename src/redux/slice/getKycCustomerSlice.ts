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

export const getKycCustomerRequest = createAsyncThunk(
  "getKycCustomer",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/kycs/${payload?.id}?include=kyc,nin,bvn,agent,verifications`;

    try {
      const response = await api.get(`${url}`);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getKycCustomerSlice = createSlice({
  name: "getKycCustomer",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getKycCustomerRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getKycCustomerRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getKycCustomerRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getKycCustomerReset = getKycCustomerSlice.actions.reset;
export const getKycCustomerSliceReducer = getKycCustomerSlice.reducer;
