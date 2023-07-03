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

export const resetInternalUserPasswordRequest = createAsyncThunk(
  'resetInternalUserPassword',
  async (payload: Dictionary, { dispatch }) => {
    const { userId } = payload;

    const url = `admin/users/${userId}/reset-password`;
    try {
      const response = await api.post(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const resetInternalUserPasswordSlice = createSlice({
  name: 'resetInternalUserPassword',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(resetInternalUserPasswordRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(resetInternalUserPasswordRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(resetInternalUserPasswordRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const resetInternalUserPasswordReset = resetInternalUserPasswordSlice.actions.reset;
export const resetInternalUserPasswordSliceReducer = resetInternalUserPasswordSlice.reducer;
