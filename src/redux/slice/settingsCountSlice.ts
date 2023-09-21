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

export const settingsCountRequest = createAsyncThunk('settingsCount', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/settings/record-counts`;
  try {
    const response = await api.get(url);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const settingsCountSlice = createSlice({
  name: 'settingsCount',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(settingsCountRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(settingsCountRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(settingsCountRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const settingsCountReset = settingsCountSlice.actions.reset;
export const settingsCountSliceReducer = settingsCountSlice.reducer;
