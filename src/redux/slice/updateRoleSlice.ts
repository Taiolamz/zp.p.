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

export const updateRoleRequest = createAsyncThunk('updateRole', async (payload: Dictionary, { dispatch }) => {
  const { id, role, permissions } = payload;

  const updatedPayload = {
    role,
    permissions,
  };
  const url = `admin/roles/${id}`;
  try {
    const response = await api.patch(url, updatedPayload);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const updateRoleSlice = createSlice({
  name: 'updateRole',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(updateRoleRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateRoleRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updateRoleRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const updateRoleReset = updateRoleSlice.actions.reset;
export const updateRoleSliceReducer = updateRoleSlice.reducer;
