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

export const deleteUserSavedBankRequest = createAsyncThunk(
  'deleteUserSavedBank',
  async (payload: Dictionary, { dispatch }) => {
    console.log('deleting actions');
    const url = `admin/users/${payload?.beneficiaryId}/banks`;
    try {
      const response = await api.delete(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const deleteUserSavedBankSlice = createSlice({
  name: 'deleteUserSavedBank',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(deleteUserSavedBankRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(deleteUserSavedBankRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(deleteUserSavedBankRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const deleteUserSavedBankReset = deleteUserSavedBankSlice.actions.reset;
export const deleteUserSavedBankSliceReducer = deleteUserSavedBankSlice.reducer;
