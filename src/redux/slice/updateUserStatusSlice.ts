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

export const updateUserStatusRequest = createAsyncThunk(
  'updateUserStatus',
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/users/`;
    try {
      const response = await api.patch(`${url}${payload.userId}/status`, payload?.data);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const updateUserStatusSlice = createSlice({
  name: 'updateUserStatus',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserStatusRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateUserStatusRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updateUserStatusRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const updateUserStatusReset = updateUserStatusSlice.actions.reset;
export const updateUserStatusSliceReducer = updateUserStatusSlice.reducer;
