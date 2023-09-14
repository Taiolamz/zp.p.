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

export const updateArticleRequest = createAsyncThunk(
  'updateArticle',
  async ({ formData, id }: any) => {

   
    const url = `admin/articles/${id}`;
    try {
      const response = await api.patch(url, formData);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const updateArticleSlice = createSlice({
  name: 'updateArticle',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(updateArticleRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateArticleRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updateArticleRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const updateArticleReset = updateArticleSlice.actions.reset;
export const updateArticleSliceReducer = updateArticleSlice.reducer;
