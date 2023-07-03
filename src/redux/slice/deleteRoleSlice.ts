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

export const deleteRoleRequest = createAsyncThunk('deleteRole', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/roles/${payload.id}`;
  try {
    const response = await api.delete(url);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const deleteRoleSlice = createSlice({
  name: 'deleteRole',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteRoleRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(deleteRoleRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(deleteRoleRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const deleteRoleReset = deleteRoleSlice.actions.reset;
export const deleteRoleSliceReducer = deleteRoleSlice.reducer;
