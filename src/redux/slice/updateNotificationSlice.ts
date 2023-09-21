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

export const updateNotificationRequest = createAsyncThunk(
  'updateNotification',
  async ({ formData, id }: any) => {

   
    const url = `admin/custom-notifications/${id}`;
    try {
      const response = await api.post(url, formData);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const updateNotificationSlice = createSlice({
  name: 'updateNotification',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(updateNotificationRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateNotificationRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updateNotificationRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const updateNotificationReset = updateNotificationSlice.actions.reset;
export const updateNotificationSliceReducer = updateNotificationSlice.reducer;
