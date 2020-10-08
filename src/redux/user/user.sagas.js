import { call, all, put, takeLatest } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
} from './user.actions';

import {
  auth,
  createUserDocumentFromUserAuth,
} from '../../firebase/firebase.utils';

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* signInOnSignUp({ payload: { user, additionalData } }) {
  try {
    const userRef = yield call(
      createUserDocumentFromUserAuth,
      user,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInOnSignUp);
}

export function* userSagas() {
  yield all([call(onSignUpStart), call(onSignUpSuccess)]);
}
