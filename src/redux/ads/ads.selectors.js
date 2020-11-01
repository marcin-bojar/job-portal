import { createSelector } from 'reselect';

const adsSelector = state => state.ads;

export const allAdsSelector = createSelector(adsSelector, ads => ads.ads);

export const filteredAdsSelector = createSelector(
  adsSelector,
  ads => ads.filteredAds
);
