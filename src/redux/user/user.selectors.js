import { createSelector } from 'reselect';

const userSelector = state => state.user;

export const currentUserSelector = createSelector(
  userSelector,
  user => user.currentUser
);

export const userMenuHiddenSelector = createSelector(
  userSelector,
  user => user.userMenuHidden
);
