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

export const createRoleRequest = createAsyncThunk('createRole', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/roles`;
  try {
    const response = await api.post(url, payload);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const createRoleSlice = createSlice({
  name: 'createRole',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(createRoleRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(createRoleRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createRoleRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const createRoleReset = createRoleSlice.actions.reset;
export const createRoleSliceReducer = createRoleSlice.reducer;
