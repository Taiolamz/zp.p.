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

export const getUserSubAgentsRequest = createAsyncThunk(
  'getUserSubAgents',
  async (payload: Dictionary, { dispatch }) => {
    const { userId, per_page, page } = payload;
    const url = `admin/user-profile/`;

    try {
      const response = await api.get(`${url}${userId}/sub-agents`, {
        params: {
          per_page,
          page,
        },
      });
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const getUserSubAgentsSlice = createSlice({
  name: 'getUserSubAgents',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserSubAgentsRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getUserSubAgentsRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getUserSubAgentsRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getUserSubAgentsReset = getUserSubAgentsSlice.actions.reset;
export const getUserSubAgentsSliceReducer = getUserSubAgentsSlice.reducer;
