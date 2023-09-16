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

export const getInternalUsersRequest = createAsyncThunk(
  'getInternalUsers',
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/users?include=roles`;

    try {
      const response = await api.get(`${url}`);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const getInternalUsersSlice = createSlice({
  name: 'getInternalUsers',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getInternalUsersRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getInternalUsersRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getInternalUsersRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getInternalUsersReset = getInternalUsersSlice.actions.reset;
export const getInternalUsersSliceReducer = getInternalUsersSlice.reducer;
