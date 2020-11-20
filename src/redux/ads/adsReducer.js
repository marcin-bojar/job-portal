import AdsActionTypes from './ads.types';

import {
  filterAds,
  filterAdsByCategory,
  removeCategoryFilter,
  mergeTwoAdsObjects,
} from './ads.utils';

import { sortAdsByDateAdded } from '../ads/ads.utils';

const INITIAL_STATE = {
  ads: null,
  searchInput: '',
  filters: {
    office: { id: 1, checked: false },
    driver: { id: 2, checked: false },
    forklift: { id: 3, checked: false },
    warehouse: { id: 4, checked: false },
  },
  filteredAds: {},
  filteredByCheckedFilters: {}, // this property is needed to restore filtered ads when search input has been deleted
  filtersApplied: false,
  error: null,
  isFetching: true,
};

const adsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdsActionTypes.FILTER_ADS:
      // if ads are already filtered then filter further only ads displayed in UI
      if (state.filtersApplied) {
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
      const filteredByCheckedFiltersAfterCatAdd = mergeTwoAdsObjects(
        state.filteredByCheckedFilters,
        filterAdsByCategory(state.ads, action.payload.category)
      );

      const filteredByCatAndBySearchInput = filterAds(
        filterAdsByCategory(state.ads, action.payload.category),
        action.payload.searchInput
      );

      // if search input is entered filter all ads by category and then filter the result of this operation by search input
      if (state.searchInput.length > 0) {
        return {
          ...state,
          filteredAds: !state.filtersApplied
            ? // no other category filters are applied and search input is present meaning there are ads from all categories matching the query in the filteredAds object and they need to be filtered by newly applied category filter
              mergeTwoAdsObjects(
                filterAdsByCategory(state.filteredAds, action.payload.category),
                filteredByCatAndBySearchInput
              )
            : // if there are category filters already applied then just merge the filteredAds object with newly added category filter and search input results
              mergeTwoAdsObjects(
                state.filteredAds,
                filteredByCatAndBySearchInput
              ),
          filteredByCheckedFilters: filteredByCheckedFiltersAfterCatAdd,
        };
      }
      return {
        ...state,
        filteredAds: mergeTwoAdsObjects(
          state.filteredAds,
          filterAdsByCategory(state.ads, action.payload.category)
        ),
        filteredByCheckedFilters: filteredByCheckedFiltersAfterCatAdd,
      };

    case AdsActionTypes.REMOVE_CATEGORY_FILTER:
      // if search input is entered update the category filters and filter the result of this operation by search input
      const allFilteredAdsAfterCatRemove = removeCategoryFilter(
        state.filteredAds,
        action.payload.category
      );

      const filteredByCheckedFiltersAfterCatRemove = removeCategoryFilter(
        state.filteredByCheckedFilters,
        action.payload.category
      );

      if (
        state.searchInput.length > 0 &&
        Object.keys(allFilteredAdsAfterCatRemove).length === 0
      ) {
        return {
          ...state,
          filteredAds: filterAds(state.ads, action.payload.searchInput),
          filteredByCheckedFilters: filteredByCheckedFiltersAfterCatRemove,
        };
      }
      return {
        ...state,
        filteredAds: allFilteredAdsAfterCatRemove,
        filteredByCheckedFilters: filteredByCheckedFiltersAfterCatRemove,
      };

    case AdsActionTypes.UPDATE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.category]: {
            ...state.filters[action.payload.category],
            checked: action.payload.isChecked,
          },
        },
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
        ads: null,
        isFetching: false,
        error: action.payload,
      };

    case AdsActionTypes.SORT_ADS_BY_DATE_ADDED:
      return {
        ...state,
        ads: sortAdsByDateAdded(state.ads),
      };

    default:
      return state;
  }
};

export default adsReducer;
