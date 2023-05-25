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

export const getDocumentHistoryRequest = createAsyncThunk(
  'getDocumentHistory',
  async (payload: Dictionary, { dispatch }) => {
    const { userId } = payload;
    const url = `admin/users/`;

    try {
      const response = await api.get(`${url}${userId}/media`);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const getDocumentHistorySlice = createSlice({
  name: 'getDocumentHistory',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getDocumentHistoryRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getDocumentHistoryRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getDocumentHistoryRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getDocumentHistoryReset = getDocumentHistorySlice.actions.reset;
export const getDocumentHistorySliceReducer = getDocumentHistorySlice.reducer;
