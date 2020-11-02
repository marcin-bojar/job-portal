import AdsActionTypes from './ads.types';

export const filterAds = filter => ({
  type: AdsActionTypes.FILTER_ADS,
  payload: filter,
});

export const setAdsFilter = newFilter => ({
  type: AdsActionTypes.SET_ADS_FILTER,
  payload: newFilter,
});
