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

export const getAllTransactionsRequest = createAsyncThunk(
  'getAllTransactions',
  async (payload: Dictionary, { dispatch }) => {
    const { model_type, status, start_date, end_date, per_page, page } = payload;
    const url = `admin/transactions`;

    try {
      const response = await api.get(`${url}`, {
        params: {
          model_type,
          status,
          start_date,
          end_date,
          per_page,
          page,
        },
      });
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const getAllTransactionsSlice = createSlice({
  name: 'getAllTransactions',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllTransactionsRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getAllTransactionsRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getAllTransactionsRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getAllTransactionsReset = getAllTransactionsSlice.actions.reset;
export const getAllTransactionsSliceReducer = getAllTransactionsSlice.reducer;
