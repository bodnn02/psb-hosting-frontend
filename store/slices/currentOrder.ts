import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { TCurrentOrder } from '../../types';

interface currentOrderState {
  currentOrder: TCurrentOrder | null;
}

const initialState: currentOrderState = {
  currentOrder: null,
}

export const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState,
  reducers: {
    fetchCurrentOrder(state, action: PayloadAction<any>) {
      state.currentOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      const nextState = {
        ...state,
        ...action.payload.currentOrder,
      }

      if (state.currentOrder) nextState.currentOrder = state.currentOrder;

      return nextState;
    });
  },
});

export const { fetchCurrentOrder } = currentOrderSlice.actions;