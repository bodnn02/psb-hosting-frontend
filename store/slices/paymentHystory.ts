import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { TPaymentHistory } from '../../types';

interface ordersState {
  paymentHistory: TPaymentHistory | null;
}

const initialState: ordersState = {
  paymentHistory: null,
}

export const paymentHistorySlice = createSlice({
  name: 'paymentHistory',
  initialState,
  reducers: {
    fetchPaymentHistory(state, action: PayloadAction<any>) {
      state.paymentHistory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      const nextState = {
        ...state,
        ...action.payload.paymentHistory,
      }

      if (state.paymentHistory) nextState.paymentHistory = state.paymentHistory;

      return nextState;
    });
  },
});

export const { fetchPaymentHistory } = paymentHistorySlice.actions;