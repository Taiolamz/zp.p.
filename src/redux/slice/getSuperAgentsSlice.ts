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

export const getSuperAgentsRequest = createAsyncThunk(
  "getSuperAgents",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/user-profile/super-agents`;

    try {
      const response = await api.get(`${url}`, {
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

const getSuperAgentsSlice = createSlice({
  name: "getSuperAgents",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSuperAgentsRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSuperAgentsRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getSuperAgentsRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getSuperAgentsReset = getSuperAgentsSlice.actions.reset;
export const getSuperAgentsSliceReducer = getSuperAgentsSlice.reducer;
