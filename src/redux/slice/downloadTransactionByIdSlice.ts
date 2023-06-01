import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';
import { saveAs } from 'file-saver';
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

export const downloadTransactionByIdRequest = createAsyncThunk(
  'downloadTransactionById',
  async (payload: Dictionary, { dispatch }) => {
    const { transId } = payload;
    const url = `admin/transactions/${transId}/download`;
    const headers = {
      //   'Content-Type': 'application/pdf',
      //   Accept: 'application/json',
      //   encoding: 'UTF-8',
      //   'Content-Disposition': 'attachment; filename="transaction.pdf"',
    };
    try {
      const response = await api.get<any, Blob>(url, {
        // responseType: 'blob',
        // responseType: 'arraybuffer',
        responseType: 'blob',
        // headers: headers,
      });



      const uri = window.URL.createObjectURL(response);

      // console.log('Here o..... : ', uri);

      const link = document.createElement('a');
      link.href = uri;
      link.setAttribute('download', 'transaction.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      return response;
    } catch (err) {
      throw err;
    }
  },
);

const downloadTransactionByIdSlice = createSlice({
  name: 'downloadTransactionById',
  initialState,
  reducers: {
    reset: state => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: builder => {
    builder.addCase(downloadTransactionByIdRequest.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(downloadTransactionByIdRequest.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(downloadTransactionByIdRequest.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const downloadTransactionByIdReset = downloadTransactionByIdSlice.actions.reset;
export const downloadTransactionByIdSliceReducer = downloadTransactionByIdSlice.reducer;
