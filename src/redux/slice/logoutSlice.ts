import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { routesPath } from "../../utils";
import { loginReset, authReset } from "./";

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

const { TOKEN, LOGIN } = routesPath;

export const logoutRequest = createAsyncThunk(
  "logout",
  async (payload, { dispatch }) => {
    try {
      const response = await api.post("logout", {});
      Cookies.remove(TOKEN);
      dispatch(loginReset());
      dispatch(authReset());
      window.location.href = LOGIN;
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logoutRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(logoutRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const logoutReset = logoutSlice.actions.reset;
export const logoutSliceReducer = logoutSlice.reducer;
