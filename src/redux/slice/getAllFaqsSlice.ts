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

export const getAllFaqsRequest = createAsyncThunk('getAllFaqs', async (payload: Dictionary, { dispatch }) => {
  const { per_page, page } = payload;
  const url = `admin/faq`;

  try {
    const response = await api.get(`${url}`, {
      params: {
        per_page,
        page,
      },
    });
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const getAllFaqsSlice = createSlice({
  name: 'getAllFaqs',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllFaqsRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getAllFaqsRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getAllFaqsRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getAllFaqsReset = getAllFaqsSlice.actions.reset;
export const getAllFaqsSliceReducer = getAllFaqsSlice.reducer;
