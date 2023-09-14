import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dictionary } from "../../types";
import api from "../../api/api";


interface InitState {
    data: Dictionary;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: any;
}
const initialState: InitState = {
    data: {},
    status: 'idle',
    error: null
}

const customerGrowthInsightSlice = createSlice({
    name: 'customer_growth_insight',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCustomerGrowthInsight.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(getCustomerGrowthInsight.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        });
        builder.addCase(getCustomerGrowthInsight.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },

})

export const getCustomerGrowthInsight = createAsyncThunk(
    'getCustomerGrowthInsight',
    async (payload: Dictionary, { dispatch }) => {
      const { frequency, week, month, year } = payload;
      const url = `admin/dashboard/customer-growth?frequency=${frequency}&week=${week}&month=${month}&year=${year}`;

    //    {
    //     params: {
    //       frequency,
    //       week,
    //       month,
    //       year,
    //     },
    //   }
  
      try {
        const response = await api.get(`${url}`);
        return response?.data;
      } catch (err) {
        throw err;
      }
    },
  );

export const customerGrowthInsightReset = customerGrowthInsightSlice.actions.reset
export const customerGrowthInsightSliceReducer = customerGrowthInsightSlice.reducer