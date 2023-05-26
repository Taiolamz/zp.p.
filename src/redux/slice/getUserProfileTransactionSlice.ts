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

export const getUserProfileTransactionRequest = createAsyncThunk(
  'getUserProfileTransaction',
  async (payload: Dictionary, { dispatch }) => {
    const { userId, per_page, page } = payload;
    const url = `admin/user-profile/`;

    try {
      const response = await api.get(`${url}${userId}/transactions`, {
        params: {
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

const getUserProfileTransactionSlice = createSlice({
  name: 'getUserProfileTransaction',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserProfileTransactionRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getUserProfileTransactionRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getUserProfileTransactionRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getUserProfileTransactionReset = getUserProfileTransactionSlice.actions.reset;
export const getUserProfileTransactionSliceReducer = getUserProfileTransactionSlice.reducer;
