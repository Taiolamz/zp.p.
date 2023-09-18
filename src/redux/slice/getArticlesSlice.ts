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

export const getArticlesRequest = createAsyncThunk(
  "getArticles",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/articles`;

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

const getArticlesSlice = createSlice({
  name: "getArticles",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticlesRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getArticlesRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getArticlesRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getArticlesReset = getArticlesSlice.actions.reset;
export const getArticlesSliceReducer = getArticlesSlice.reducer;
