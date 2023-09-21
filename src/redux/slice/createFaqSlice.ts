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

export const createFaqRequest = createAsyncThunk('createFaq', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/faq`;
  try {
    console.log(payload, 'payload');
    const response = await api.post(url, payload);

    return response?.data;
  } catch (err) {
    throw err;
  }
});

const createFaqSlice = createSlice({
  name: 'createFaq',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(createFaqRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(createFaqRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createFaqRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const createFaqReset = createFaqSlice.actions.reset;
export const createFaqSliceReducer = createFaqSlice.reducer;
