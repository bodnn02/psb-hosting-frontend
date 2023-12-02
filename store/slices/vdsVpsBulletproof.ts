import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { TVdsBulletproof } from '../../types';

interface vdsBulletproofState {
  vdsVpsBulletproof: TVdsBulletproof[] | null;
}

const initialState: vdsBulletproofState = {
  vdsVpsBulletproof: null,
}

export const vdsVpsBulletproofSlice = createSlice({
  name: 'vdsVpsBulletproof',
  initialState,
  reducers: {
    fetchVdsVpsBulletproof(state, action: PayloadAction<any>) {
      state.vdsVpsBulletproof = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      const nextState = {
        ...state,
        ...action.payload.vdsVpsBulletproof,
      }

      if (state.vdsVpsBulletproof) nextState.vdsVpsBulletproof = state.vdsVpsBulletproof;

      return nextState;
    });
  },
});

export const { fetchVdsVpsBulletproof } = vdsVpsBulletproofSlice.actions;