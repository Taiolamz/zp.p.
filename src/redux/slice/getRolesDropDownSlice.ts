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

export const getRolesDropDownRequest = createAsyncThunk(
  'getRolesDropDown',
  async (payload: Dictionary, { dispatch }) => {
    const url = `admin/role-dropdown`;

    try {
      const response = await api.get(url);
      return response?.data;
    } catch (err) {
      throw err;
    }
  },
);

const getRolesDropDownSlice = createSlice({
  name: 'getRolesDropDown',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(getRolesDropDownRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(getRolesDropDownRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getRolesDropDownRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const getRolesDropDownSliceReset = getRolesDropDownSlice.actions.reset;
export const getRolesDropDownSliceReducer = getRolesDropDownSlice.reducer;
