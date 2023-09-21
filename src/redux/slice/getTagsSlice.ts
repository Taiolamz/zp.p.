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

export const getTagsRequest = createAsyncThunk('getTags', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/tags`;

  try {
    const response = await api.get(`${url}`, {});
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const getTagsSlice = createSlice({
  name: 'getTags',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getTagsRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getTagsRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getTagsRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getTagsReset = getTagsSlice.actions.reset;
export const getTagsSliceReducer = getTagsSlice.reducer;
