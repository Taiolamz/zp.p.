import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export interface LoginType {
  email: string;
  password: string;
}

interface LoginState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState = {
  data: {},
  status: "idle",
  error: null,
} as LoginState;

export const loginRequest = createAsyncThunk(
  "login",
  async (payload: LoginType) => {
    try {
      const response = await api.post("login", payload);
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const loginReset = loginSlice.actions.reset;
export const loginSliceReducer = loginSlice.reducer;
