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

export const getRolesRequest = createAsyncThunk('getRoles', async (payload: Dictionary, { dispatch }) => {
  const url = `admin/roles?include=permissions`;

  try {
    const response = await api.get(`${url}`);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const getRolesSlice = createSlice({
  name: 'getRoles',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getRolesRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getRolesRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getRolesRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getRolesReset = getRolesSlice.actions.reset;
export const getRolesSliceReducer = getRolesSlice.reducer;
