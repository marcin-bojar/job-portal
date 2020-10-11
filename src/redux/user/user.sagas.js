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
  getCurrentUser,
} from '../../firebase/firebase.utils';

function* getUserSnapshotAndSignIn(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserDocumentFromUserAuth,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* signInOnSignUp({ payload: { user, additionalData } }) {
  yield call(getUserSnapshotAndSignIn, user, additionalData);
}

function* isUserLoggedIn() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getUserSnapshotAndSignIn(userAuth);
  } catch (error) {
    put(signInFailure(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInOnSignUp);
}
export function* onCheckCurrentUSer() {
  yield takeLatest(UserActionTypes.CHECK_CURRENT_USER, isUserLoggedIn);
}

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onCheckCurrentUSer),
  ]);
}
