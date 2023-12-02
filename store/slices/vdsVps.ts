import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { TVds } from '../../types';

interface vdsVpsState {
  vdsVps: TVds[] | null;
}

const initialState: vdsVpsState = {
  vdsVps: null,
}

export const vdsVpsSlice = createSlice({
  name: 'vdsVps',
  initialState,
  reducers: {
    fetchVdsVps(state, action: PayloadAction<any>) {
      state.vdsVps = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      const nextState = {
        ...state,
        ...action.payload.vdsVps,
      }

      if (state.vdsVps) nextState.vdsVps = state.vdsVps;

      return nextState;
    });
  },
});

export const { fetchVdsVps } = vdsVpsSlice.actions;