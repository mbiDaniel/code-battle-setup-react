import { createSelector } from '@reduxjs/toolkit';

const getAuthState = state => state.auth || {};

export const selectProfiles = createSelector(
  getAuthState,
  auth => auth.profiles.data
);
export const selectProfilesLoading = createSelector(
  getAuthState,
  auth => auth.profiles.loading
);
export const selectUser = createSelector(
  getAuthState,
  auth => auth.user
);
export const selectAuthError = createSelector(
  getAuthState,
  auth => auth.error
);
export const selectAuthLoading = createSelector(
  getAuthState,
  auth => auth.loading
);


