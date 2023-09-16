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

export const updateInternalUserRequest = createAsyncThunk(
  'updateInternalUser',
  async (payload: Dictionary, { dispatch }) => {
    const { userId, first_name, last_name, role, email } = payload;

    const updatedPayload = {
      first_name,
      last_name,
      role,
      email,
    };
    const url = `admin/users/${userId}`;
    try {
      const response = await api.patch(url, updatedPayload);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const updateInternalUserSlice = createSlice({
  name: 'updateInternalUser',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(updateInternalUserRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateInternalUserRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updateInternalUserRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const updateInternalUserReset = updateInternalUserSlice.actions.reset;
export const updateInternalUserSliceReducer = updateInternalUserSlice.reducer;
