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

export const createEscalationTicketRequest = createAsyncThunk(
  "createEscalationTicket",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/tickets`;
    try {
      const response = await api.post(url, payload);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const createEscalationTicketSlice = createSlice({
  name: "createEscalationTicket",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createEscalationTicketRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      createEscalationTicketRequest.fulfilled,
      (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      }
    );
    builder.addCase(createEscalationTicketRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const createEscalationTicketReset =
  createEscalationTicketSlice.actions.reset;
export const createEscalationTicketSliceReducer =
  createEscalationTicketSlice.reducer;
