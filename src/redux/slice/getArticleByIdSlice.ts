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

export const getArticleByIdRequest = createAsyncThunk(
  "getArticleById",
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/articles/${payload.articleId}`;

    try {
      const response = await api.get(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  }
);

const getArticleByIdSlice = createSlice({
  name: "getArticleById",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticleByIdRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getArticleByIdRequest.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getArticleByIdRequest.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const getArticleByIdReset = getArticleByIdSlice.actions.reset;
export const getArticleByIdSliceReducer = getArticleByIdSlice.reducer;
