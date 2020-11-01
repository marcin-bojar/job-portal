import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import adsReducer from './ads/adsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  ads: adsReducer,
});

export default rootReducer;
