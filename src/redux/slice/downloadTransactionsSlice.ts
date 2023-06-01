import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { showMessage } from '../../utils';

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

export const downloadTransactionsRequest = createAsyncThunk(
  'downloadTransactions',
  async (payload: Dictionary, { dispatch }) => {
    const { model_type, status, start_date, end_date } = payload;
    const url = `admin/transactions/export`;

    try {
      const response = await api.get<any, Blob>(url, {
        responseType: 'blob',

        params: {
          model_type,
          status,
          start_date,
          end_date,
        },
      });

      const uri = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = uri;

      link.setAttribute('download', 'transaction.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      showMessage({ type: 'success', message: 'Download Successfully' });
      return response;
    } catch (err) {
      throw err;
    }
  },
);

const downloadTransactionsSlice = createSlice({
  name: 'downloadTransactions',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(downloadTransactionsRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(downloadTransactionsRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(downloadTransactionsRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const downloadTransactionsSliceReset = downloadTransactionsSlice.actions.reset;
export const downloadTransactionsSliceReducer = downloadTransactionsSlice.reducer;
