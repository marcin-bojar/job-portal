import AdsActionTypes from './ads.types';

export const filterAds = filter => ({
  type: AdsActionTypes.FILTER_ADS,
  payload: filter,
});

export const filterAdsByCategory = category => ({
  type: AdsActionTypes.FILTER_ADS_BY_CATEGORY,
  payload: category,
});

export const setAdsFilter = newFilter => ({
  type: AdsActionTypes.SET_ADS_FILTER,
  payload: newFilter,
});

export const removeCategoryFilter = category => ({
  type: AdsActionTypes.REMOVE_CATEGORY_FILTER,
  payload: category,
});

export const noFilter = () => ({
  type: AdsActionTypes.NO_FILTER,
});
