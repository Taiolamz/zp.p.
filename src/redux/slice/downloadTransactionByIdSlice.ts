import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { replaceStringWithBackslach } from '../../utils';
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

export const downloadTransactionByIdRequest = createAsyncThunk(
  'downloadTransactionById',
  async (payload: Dictionary, { dispatch }) => {
    const { transId } = payload;
    const url = `admin/transactions/${transId}/download`;

    try {
      const response = await api.get(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const downloadTransactionByIdSlice = createSlice({
  name: 'downloadTransactionById',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(downloadTransactionByIdRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(downloadTransactionByIdRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(downloadTransactionByIdRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const downloadTransactionByIdReset = downloadTransactionByIdSlice.actions.reset;
export const downloadTransactionByIdSliceReducer = downloadTransactionByIdSlice.reducer;
