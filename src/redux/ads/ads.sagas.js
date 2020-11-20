import { put, call, takeLatest, all } from 'redux-saga/effects';

import {
  fetchAdsSuccess,
  fetchAdsFailure,
  sortAdsByDateAdded,
} from './ads.actions';

import {
  fetchAllAds,
  fetchTenLatestAdsFromEachCategory,
} from '../../firebase/firebase.utils';

import AdsActionTypes from './ads.types';

function* fetchAds() {
  try {
    const allAds = yield call(fetchAllAds);
    yield put(fetchAdsSuccess(allAds));
    // yield put(sortAdsByDateAdded());
  } catch (error) {
    yield put(fetchAdsFailure(error));
  }
}

function* fetchTenAds() {
  try {
    const tenAds = yield call(fetchTenLatestAdsFromEachCategory);
    yield put(fetchAdsSuccess(tenAds));
    // yield put(sortAdsByDateAdded());
  } catch (error) {
    yield put(fetchAdsFailure(error));
  }
}

export function* onFetchAdsStart() {
  yield takeLatest(AdsActionTypes.FETCH_ADS_START, fetchAds);
}

export function* onFetchTenLatestAdsStart() {
  yield takeLatest(AdsActionTypes.FETCH_TEN_LATEST_ADS_START, fetchTenAds);
}

export function* adsSagas() {
  yield all([call(onFetchAdsStart), call(onFetchTenLatestAdsStart)]);
}
