import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { THosting } from '../../types';

interface hostingState {
  hosting: THosting[] | null;
}

const initialState: hostingState = {
  hosting: null,
}

export const hostingSlice = createSlice({
  name: 'hosting',
  initialState,
  reducers: {
    fetchHosting(state, action: PayloadAction<any>) {
      state.hosting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      const nextState = {
        ...state,
        ...action.payload.hosting,
      }

      if (state.hosting) nextState.hosting = state.hosting;

      return nextState;
    });
  },
});

export const { fetchHosting } = hostingSlice.actions;