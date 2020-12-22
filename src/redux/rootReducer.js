import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import adsReducer from './ads/adsReducer';
import uiReducer from './ui/uiReducer';

const rootReducer = combineReducers({
  user: userReducer,
  ads: adsReducer,
  ui: uiReducer,
});

export default rootReducer;
