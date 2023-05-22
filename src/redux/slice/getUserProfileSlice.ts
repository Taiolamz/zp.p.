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

export const getUserProfileRequest = createAsyncThunk('getUserProfile', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/user-profile/`;

  try {
    const response = await api.get(`${url}${payload.userId}?include=account,agent,bvn`);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const getUserProfileSlice = createSlice({
  name: 'getUserProfile',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserProfileRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getUserProfileRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getUserProfileRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getUserProfileReset = getUserProfileSlice.actions.reset;
export const getUserProfileSliceReducer = getUserProfileSlice.reducer;
