import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface loginState {
  login: boolean;
}

const initialState: loginState = {
  login: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAppLogin(state, action: PayloadAction<any>) {
      state.login = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      const nextState = {
        ...state,
        ...action.payload.login,
      }

      if (state.login) nextState.login = state.login;

      return nextState;
    });
  },
});

export const { setAppLogin } = loginSlice.actions;