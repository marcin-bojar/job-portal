import { createSelector } from 'reselect';

const adsSelector = state => state.ads;

export const allAdsSelector = createSelector(adsSelector, ads => ads.ads);

export const filteredAdsSelector = createSelector(
  adsSelector,
  ads => ads.filteredAds
);

export const searchInputSelector = createSelector(
  adsSelector,
  ads => ads.searchInput
);

export const filtersSelector = createSelector(adsSelector, ads => ads.filters);

export const filtersAppliedSelector = createSelector(
  adsSelector,
  ads => ads.filtersApplied
);

export const isFetchingSelector = createSelector(
  adsSelector,
  ads => ads.isFetching
);

export const errorSelector = createSelector(adsSelector, ads => ads.error);

export const readyToDisplaySelector = createSelector(
  adsSelector,
  ads => ads.readyToDisplay
);
