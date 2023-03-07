import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface AuthType {
  token: string;
  rememberUser: boolean;
  authenticated: boolean;
}

interface InitState {
  data: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState = {
  data: {},
  status: "idle",
  error: null,
} as InitState;

export const authRequest = createAsyncThunk(
  "auth",
  async (payload: AuthType) => {
    try {
      const { token, rememberUser } = payload;
      const response = {
        token: token,
        rememberUser: rememberUser,
        authenticated: true,
      };
      return response;
    } catch (err) {
      throw err;
    }
  }
);

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(authRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(authRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const authReset = authSlice.actions.reset;
export const authSliceReducer = authSlice.reducer;
