import AdsActionTypes from './ads.types';

import {
  filterAds,
  filterAdsByCategory,
  mergeTwoAdsArrays,
  removeCategoryFilter,
} from './ads.utils';

const INITIAL_STATE = {
  ads: null,
  searchInput: '',
  filteredAds: [],
  filteredByCheckedFilters: [], // this property is needed to restore filtered ads when search input has been deleted
  filtersApplied: false,
  error: null,
  isFetching: true,
};

const adsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdsActionTypes.FILTER_ADS:
      // if ads are already filtered then filter further only ads displayed in UI
      if (state.filteredAds.length > 0 || state.filtersApplied) {
        return {
          ...state,
          filteredAds: filterAds(state.filteredAds, action.payload),
        };
      }
      return {
        ...state,
        filteredAds: filterAds(state.ads, action.payload),
      };

    case AdsActionTypes.SET_ADS_FILTER:
      return {
        ...state,
        searchInput: action.payload,
      };

    case AdsActionTypes.FILTER_ADS_BY_CATEGORY:
      if (state.searchInput.length > 0) {
        return {
          ...state,
          filteredAds: mergeTwoAdsArrays(
            state.filteredAds.filter(ad => ad.id !== action.id),
            filterAdsByCategory(state.ads, action.payload)
          ),
          filteredByCheckedFilters: state.filteredByCheckedFilters.concat(
            filterAdsByCategory(state.ads, action.payload)
          ),

          searchInput: '',
        };
      }
      return {
        ...state,
        filteredAds: mergeTwoAdsArrays(
          state.filteredAds,
          filterAdsByCategory(state.ads, action.payload)
        ),
        filteredByCheckedFilters: state.filteredByCheckedFilters.concat(
          filterAdsByCategory(state.ads, action.payload)
        ),
      };

    case AdsActionTypes.REMOVE_CATEGORY_FILTER:
      return {
        ...state,
        filteredAds: removeCategoryFilter(state.filteredAds, action.payload),
        filteredByCheckedFilters: removeCategoryFilter(
          state.filteredByCheckedFilters,
          action.payload
        ),
        searchInput: '',
      };

    case AdsActionTypes.UPDATE_FILTERS_STATUS:
      return {
        ...state,
        filtersApplied: action.payload,
      };

    case AdsActionTypes.CLEAR_FILTERED_ADS:
      return {
        ...state,
        filteredAds: state.filteredByCheckedFilters,
      };

    case AdsActionTypes.CLEAR_ALL_FILTERS:
      return {
        ...state,
        filteredAds: [],
        filteredByCheckedFilters: [],
        filtersApplied: false,
        searchInput: '',
      };

    case AdsActionTypes.FETCH_ADS_START:
      return {
        ...state,
        isFetching: true,
      };

    case AdsActionTypes.FETCH_ADS_SUCCESS:
      return {
        ...state,
        ads: action.payload,
        isFetching: false,
      };

    case AdsActionTypes.FETCH_ADS_FAILURE:
      return {
        ...state,
        ads: [],
        isFetching: false,
      };

    default:
      return state;
  }
};

export default adsReducer;
