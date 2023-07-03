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

export const getSingleRoleRequest = createAsyncThunk('getRoles', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/roles/${payload.id}?include=permissions`;

  try {
    const response = await api.get(`${url}`);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const getSingleRoleSlice = createSlice({
  name: 'getSingleRole',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getSingleRoleRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getSingleRoleRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getSingleRoleRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getSingleRoleReset = getSingleRoleSlice.actions.reset;
export const getSingleRoleSliceReducer = getSingleRoleSlice.reducer;
