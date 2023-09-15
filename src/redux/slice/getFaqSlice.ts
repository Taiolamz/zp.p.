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

export const getFaqRequest = createAsyncThunk('getFaq', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/faq`;

  try {
    const response = await api.get(`${url}/${payload.faqId}`);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const getFaqSlice = createSlice({
  name: 'getFaq',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getFaqRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getFaqRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getFaqRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getFaqReset = getFaqSlice.actions.reset;
export const getFaqSliceReducer = getFaqSlice.reducer;
