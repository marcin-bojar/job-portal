import ADS_DATA from '../../ADS_DATA';
import AdsActionTypes from './ads.types';

import { filterAds } from './ads.utils';

const INITIAL_STATE = ADS_DATA;

const adsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdsActionTypes.FILTER_ADS:
      return {
        ...state,
        filteredAds: filterAds(state, action.payload),
      };

    default:
      return state;
  }
};

export default adsReducer;
