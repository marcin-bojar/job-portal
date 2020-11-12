import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { adsSagas } from './ads/ads.sagas';

function* rootSaga() {
  yield all([call(userSagas), call(adsSagas)]);
}

export default rootSaga;
