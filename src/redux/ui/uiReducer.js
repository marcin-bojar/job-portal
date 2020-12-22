import UiActionTypes from './ui.types';

const INITIAL_STATE = {
  showHeader: true,
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UiActionTypes.SHOULD_SHOW_HEADER:
      return {
        ...state,
        showHeader: action.payload,
      };

    default:
      return state;
  }
};

export default uiReducer;
