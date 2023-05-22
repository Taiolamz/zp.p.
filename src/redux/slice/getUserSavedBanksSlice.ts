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

export const getUserSavedBanksRequest = createAsyncThunk(
  'getUserSavedBanks',
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/users/`;
    try {
      const response = await api.get(`${url}${payload.userId}/banks`);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const getUserSavedBanksSlice = createSlice({
  name: 'getUserSavedBanks',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserSavedBanksRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getUserSavedBanksRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getUserSavedBanksRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getUserSavedBanksReset = getUserSavedBanksSlice.actions.reset;
export const getUserSavedBanksSliceReducer = getUserSavedBanksSlice.reducer;
