import UiActionTypes from './ui.types';

export const shouldShowHeader = shouldShow => ({
  type: UiActionTypes.SHOULD_SHOW_HEADER,
  payload: shouldShow,
});
