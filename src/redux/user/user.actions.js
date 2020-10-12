import UserActionTypes from './user.types';

export const toggleUserMenu = () => ({
  type: UserActionTypes.TOGGLE_USER_MENU,
});

export const checkCurrentUser = () => ({
  type: UserActionTypes.CHECK_CURRENT_USER,
});

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const signUpStart = userData => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userData,
});

export const signUpSuccess = user => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const emailSignInStart = userData => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: userData,
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});
