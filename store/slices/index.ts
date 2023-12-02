import { combineReducers } from 'redux';

import { vdsVpsSlice } from './vdsVps';
import { vpnSlice } from './vpn';
import { vdsVpsBulletproofSlice } from './vdsVpsBulletproof';
import { hostingSlice } from './hosting';
import { userSlice } from './user';
import { ordersSlice } from './orders';
import { currentOrderSlice } from './currentOrder';
import { paymentHistorySlice } from './paymentHystory';
import { loginSlice } from './login';

export const rootReducer = combineReducers({
  vdsVps: vdsVpsSlice.reducer,
  vpn: vpnSlice.reducer,
  vdsVpsBulletproof: vdsVpsBulletproofSlice.reducer,
  hosting: hostingSlice.reducer,
  user: userSlice.reducer,
  orders: ordersSlice.reducer,
  currentOrder: currentOrderSlice.reducer,
  paymentHistory: paymentHistorySlice.reducer,
  login: loginSlice.reducer,
});