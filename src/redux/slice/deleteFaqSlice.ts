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

export const deleteFaqRequest = createAsyncThunk('deleteFaq', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/faq/${payload.id}`;
  try {
    const response = await api.delete(url);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const deleteFaqSlice = createSlice({
  name: 'deleteFaq',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteFaqRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(deleteFaqRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(deleteFaqRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const deleteFaqReset = deleteFaqSlice.actions.reset;
export const deleteFaqSliceReducer = deleteFaqSlice.reducer;
