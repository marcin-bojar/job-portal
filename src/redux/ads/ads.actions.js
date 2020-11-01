import AdsActionTypes from './ads.types';

export const filterAds = filter => ({
  type: AdsActionTypes.FILTER_ADS,
  payload: filter,
});
