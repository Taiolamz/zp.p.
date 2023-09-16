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

export const createInternalUserRequest = createAsyncThunk(
  'createInternalUser',
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/users`;
    try {
      const response = await api.post(url, payload);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const createInternalUserSlice = createSlice({
  name: 'createInternalUser',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(createInternalUserRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(createInternalUserRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createInternalUserRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const createInternalUserReset = createInternalUserSlice.actions.reset;
export const createInternalUserSliceReducer = createInternalUserSlice.reducer;
