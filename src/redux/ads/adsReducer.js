import ADS_DATA from '../../ADS_DATA';
import AdsActionTypes from './ads.types';

import {
  filterAds,
  filterAdsByCategory,
  removeCategoryFilter,
} from './ads.utils';

const INITIAL_STATE = {
  ads: ADS_DATA,
  searchInput: '',
  filteredAds: [],
  filtersApplied: false,
};

const adsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdsActionTypes.FILTER_ADS:
      return {
        ...state,
        filteredAds: filterAds(state, action.payload),
      };

    case AdsActionTypes.SET_ADS_FILTER:
      return {
        ...state,
        searchInput: action.payload,
      };

    case AdsActionTypes.FILTER_ADS_BY_CATEGORY:
      return {
        ...state,
        filteredAds: state.filteredAds.concat(
          filterAdsByCategory(state, action.payload)
        ),
      };

    case AdsActionTypes.REMOVE_CATEGORY_FILTER:
      return {
        ...state,
        filteredAds: removeCategoryFilter(state.filteredAds, action.payload),
      };

    case AdsActionTypes.UPDATE_FILTERS_STATUS:
      return {
        ...state,
        filtersApplied: action.payload,
      };

    default:
      return state;
  }
};

export default adsReducer;
