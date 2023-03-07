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

const { TOKEN } = routesPath;

export const loginRequest = createAsyncThunk(
  "login",
  async (payload: LoginType, { dispatch }) => {
    const { email, password, rememberUser } = payload;
    try {
      // for the actual login api
      //   const response = await api.post("login", payload);
      //   return response.data;

      if (email === "test@test.com" && password === "P@ssword") {
        Cookies.set(TOKEN, "Allenjamesnbworn");
        console.log("it is here now");
        const response = {
          email,
          name: "John Doe",
          token: "Allenjamesnbworn",
        };

        dispatch(
          authRequest({
            token: "Allenjamesnbworn",
            rememberUser: rememberUser,
            authenticated: true,
          })
        );

        return response;
      } else {
        console.log("error 1");
        return "Invalid email or password";
      }
    } catch (err) {
      console.log(err, "errors");
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
