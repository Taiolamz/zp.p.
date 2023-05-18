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

export const getUsersRequest = createAsyncThunk(
  "getUsers",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/user-profile`;

    try {
      const response = await api.get(`${url}${payload.path}`, {
        params: {
          per_page: payload.per_page,
          page: payload.page,
        },
      });
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getUsersSlice = createSlice({
  name: "getUsers",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsersRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getUsersRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getUsersReset = getUsersSlice.actions.reset;
export const getUsersSliceReducer = getUsersSlice.reducer;
