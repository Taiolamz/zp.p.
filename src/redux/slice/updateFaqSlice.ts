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

export const updateFaqRequest = createAsyncThunk('updateFaq', async (payload: Dictionary, { dispatch }) => {
  const { faqId, question, propose_solution, active_platform, status, tag_id, _method } = payload;

  const updatedPayload = {
    question,
    propose_solution,
    active_platform,
    status,
    tag_id,
    _method,
  };
  const url = `admin/faq/${faqId}`;
  try {
    const response = await api.post(url, updatedPayload);
    return response?.data;
  } catch (err) {
    throw err;
  }
});

const updateFaqSlice = createSlice({
  name: 'updateFaq',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(updateFaqRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateFaqRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updateFaqRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const updateFaqReset = updateFaqSlice.actions.reset;
export const updateFaqSliceReducer = updateFaqSlice.reducer;
