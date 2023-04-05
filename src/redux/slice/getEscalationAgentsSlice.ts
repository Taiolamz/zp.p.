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

export const getEscalationAgentsRequest = createAsyncThunk(
  "getEscalationAgents",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/tickets/internal-user`;
    try {
      const response = await api.get(`${url}`);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getEscalationAgentsSlice = createSlice({
  name: "getEscalationAgents",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEscalationAgentsRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getEscalationAgentsRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getEscalationAgentsRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getEscalationAgentsReset = getEscalationAgentsSlice.actions.reset;
export const getEscalationAgentsSliceReducer = getEscalationAgentsSlice.reducer;
