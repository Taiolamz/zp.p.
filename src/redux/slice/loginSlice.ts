import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { authRequest } from "./authSlice";
import { routesPath } from "../../utils";
export interface LoginType {
  email: string;
  password: string;
  rememberUser: boolean;
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

const { TOKEN, REMEMBERUSER } = routesPath;

export const loginRequest = createAsyncThunk(
  "login",
  async (payload: LoginType, { dispatch }) => {
    const { email, password, rememberUser } = payload;
    try {
      // for the actual login api
      const payloadData = {
        email,
        password,
      };
      const response = await api.post("admin/login", payloadData);

      const { token, user } = response.data;
      const rememberedEmail = user.email;
      const rememberUserToString = !!rememberUser ? rememberedEmail : "";
      Cookies.set(TOKEN, token);
      Cookies.set(REMEMBERUSER, rememberUserToString);
      dispatch(authRequest(user));

      return response?.data;
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
      state.error = null;
    });
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const loginReset = loginSlice.actions.reset;
export const loginSliceReducer = loginSlice.reducer;
