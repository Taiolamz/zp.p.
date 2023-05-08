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

export const kycVerificationRequest = createAsyncThunk(
  "kycVerification",
  async (payload: Dictionary, { dispatch }) => {
    const { verificationId, status } = payload;
    const url = `admin/verifications/${verificationId}`;
    const verificationStatus = { status };
    try {
      const response = await api.patch(url, verificationStatus);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const kycVerificationSlice = createSlice({
  name: "kycVerification",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(kycVerificationRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(kycVerificationRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(kycVerificationRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const kycVerificationReset = kycVerificationSlice.actions.reset;
export const kycVerificationSliceReducer = kycVerificationSlice.reducer;
