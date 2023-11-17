import { createReducer } from '@reduxjs/toolkit';
import authActions from './authActions';
import { getLocalUser } from 'helper/auth';
import appActions from '../app/appActions';

const initialState = {
  error: null,
  profile: null,
  loading: false,
  user: {},
};

const authReducer = createReducer(initialState, {
  [appActions.initialize]: (state) => {
    state.user = getLocalUser()
  },
  [authActions.loginUser.pending]: (state) => {
    state.loading = true;
  },
  [authActions.loginUser.fulfilled]: (state, action) => {
    state.loading = false;
    state.error = action.payload.message
  },
  [authActions.loginUser.rejected]: (state, action) => {
    state.loading = false;

    state.error = action.payload?.error;
  },
});

export default authReducer;
