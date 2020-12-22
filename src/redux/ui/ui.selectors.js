import { createSelector } from 'reselect';

const uiSelector = state => state.ui;

export const showHeaderSelector = createSelector(
  uiSelector,
  ui => ui.showHeader
);
