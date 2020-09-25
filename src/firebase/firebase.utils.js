import * as firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDc7eNT44_df0_zNSRd-h_Z_rVQ-2vhfg4',
  authDomain: 'cargo-runner.firebaseapp.com',
  databaseURL: 'https://cargo-runner.firebaseio.com',
  projectId: 'cargo-runner',
  storageBucket: 'cargo-runner.appspot.com',
  messagingSenderId: '376618493070',
  appId: '1:376618493070:web:f26d936be6f7389e39d5df',
  measurementId: 'G-LN2DLF8LM4',
};

firebase.initializeApp(config);
// const analytics = firebase.analytics();
// analytics.logEvent();

export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

auth.useDeviceLanguage();

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
    const userRef = res.user;
    console.log(userRef);
    return userRef;
  } catch (error) {
    console.log(error.message);
  }
};
