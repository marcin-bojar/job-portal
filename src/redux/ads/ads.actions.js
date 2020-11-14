import AdsActionTypes from './ads.types';

export const filterAds = filter => ({
  type: AdsActionTypes.FILTER_ADS,
  payload: filter,
});

export const filterAdsByCategory = filter => ({
  type: AdsActionTypes.FILTER_ADS_BY_CATEGORY,
  payload: filter,
});

export const removeCategoryFilter = category => ({
  type: AdsActionTypes.REMOVE_CATEGORY_FILTER,
  payload: category,
});

export const setAdsFilter = newFilter => ({
  type: AdsActionTypes.SET_ADS_FILTER,
  payload: newFilter,
});

export const updateFiltersStatus = areFiltersApplied => ({
  type: AdsActionTypes.UPDATE_FILTERS_STATUS,
  payload: areFiltersApplied,
});

export const clearFilteredAds = () => ({
  type: AdsActionTypes.CLEAR_FILTERED_ADS,
});

export const clearAllFilters = () => ({
  type: AdsActionTypes.CLEAR_ALL_FILTERS,
});

export const fetchAdsStart = () => ({
  type: AdsActionTypes.FETCH_ADS_START,
});

export const fetchTenLatestAdsStart = () => ({
  type: AdsActionTypes.FETCH_TEN_LATEST_ADS_START,
});

export const fetchAdsSuccess = ads => ({
  type: AdsActionTypes.FETCH_ADS_SUCCESS,
  payload: ads,
});

export const fetchAdsFailure = error => ({
  type: AdsActionTypes.FETCH_ADS_FAILURE,
  payload: error,
});
