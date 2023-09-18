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

export const deleteNotificationRequest = createAsyncThunk(
  'deleteNotification',
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/custom-notifications/${payload?.id}`;
    try {
      const response = await api.delete(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const deleteNotificationSlice = createSlice({
  name: 'deleteNotification',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteNotificationRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(deleteNotificationRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(deleteNotificationRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const deleteNotificationReset = deleteNotificationSlice.actions.reset;
export const deleteNotificationSliceReducer = deleteNotificationSlice.reducer;