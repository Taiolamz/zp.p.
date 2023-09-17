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

const multiPartContent = 'multipart/form-data';

export const createArticleRequest = createAsyncThunk(
  'createArticleSlice',
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/articles`;
    try {
      const response = await api.post(url, payload);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const createArticleSlice = createSlice({
  name: 'createArticle',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(createArticleRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(createArticleRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createArticleRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const createArticleReset = createArticleSlice.actions.reset;
export const createArticleReducer = createArticleSlice.reducer;
