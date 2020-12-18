import { put, call, takeLatest, all } from 'redux-saga/effects';

import {
  createAdSuccess,
  createAdFailure,
  fetchAdsSuccess,
  fetchAdsFailure,
  sortAdsByDateAdded,
} from './ads.actions';

import {
  fetchAllAds,
  fetchTenLatestAdsFromEachCategory,
  createAdDocument,
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
    yield put(sortAdsByDateAdded());
  } catch (error) {
    yield put(fetchAdsFailure(error));
  }
}

function* createAd({ payload }) {
  try {
    const adRef = yield call(createAdDocument, payload);
    const adSnapshot = yield adRef.get();
    const ad = yield adSnapshot.data();
    yield put(createAdSuccess(ad));
  } catch (error) {
    yield put(createAdFailure(error));
  }
}

export function* onFetchAdsStart() {
  yield takeLatest(AdsActionTypes.FETCH_ADS_START, fetchAds);
}

export function* onFetchTenLatestAdsStart() {
  yield takeLatest(AdsActionTypes.FETCH_TEN_LATEST_ADS_START, fetchTenAds);
}

export function* onCreateAdStart() {
  yield takeLatest(AdsActionTypes.CREATE_AD_START, createAd);
}

export function* adsSagas() {
  yield all([
    call(onFetchAdsStart),
    call(onFetchTenLatestAdsStart),
    call(onCreateAdStart),
  ]);
}
