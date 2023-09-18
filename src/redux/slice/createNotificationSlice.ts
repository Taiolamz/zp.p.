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

export const createNotificationRequest = createAsyncThunk(
  'createNotificationSlice',
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/custom-notifications`;
    try {
      const response = await api.post(url, payload);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const createNotificationSlice = createSlice({
  name: 'createNotification',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(createNotificationRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(createNotificationRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createNotificationRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const createNotificationReset = createNotificationSlice.actions.reset;
export const createNotificationSliceReducer = createNotificationSlice.reducer;
