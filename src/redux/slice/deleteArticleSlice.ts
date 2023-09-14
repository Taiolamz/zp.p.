import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
type Dictionary = {
  [key: string]: any;
};

interface InitState {
  data: Dictionary;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
}

const initialState = {
  data: {},
  status: 'idle',
  error: null,
} as InitState;

export const deleteArticleRequest = createAsyncThunk(
  'deleteArticle',
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/articles/${payload?.articleId}`;
    try {
      const response = await api.delete(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const deleteArticleSlice = createSlice({
  name: 'deleteArticle',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteArticleRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(deleteArticleRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(deleteArticleRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const deleteArticleReset = deleteArticleSlice.actions.reset;
export const deleteArticleSliceReducer = deleteArticleSlice.reducer;