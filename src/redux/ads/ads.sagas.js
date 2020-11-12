import { put, call, takeLatest, all } from 'redux-saga/effects';

import { fetchAdsSuccess, fetchAdsFailure } from './ads.actions';

import { fetchAllAds } from '../../firebase/firebase.utils';

import AdsActionTypes from './ads.types';

function* fetchAds() {
  try {
    const allAds = yield call(fetchAllAds);
    yield put(fetchAdsSuccess(allAds));
  } catch (error) {
    yield put(fetchAdsFailure(error));
  }
}

export function* onFetchAdsStart() {
  yield takeLatest(AdsActionTypes.FETCH_ADS_START, fetchAds);
}

export function* adsSagas() {
  yield all([call(onFetchAdsStart)]);
}
