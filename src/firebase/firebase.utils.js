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
export const db = firebase.firestore();

// const analytics = firebase.analytics();
// analytics.logEvent();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

const createUserDocumentFromUserAuth = userAuth => {
  const userRef = db.collection('users').doc(userAuth.uid);
  const { displayName, email } = userAuth;

  userRef
    .get()
    .then(user => {
      if (!user.exists) {
        userRef.set({
          displayName,
          email,
          createdAt: new Date(),
        });
      }
    })
    .catch(error => console.log(error));
};

export const auth = firebase.auth();
auth.useDeviceLanguage();

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
    const userAuth = res.user;
    createUserDocumentFromUserAuth(userAuth);
  } catch (error) {
    console.log(error.message);
  }
};

export const registerNewUser = (displayName, email, password) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const userAuth = res.user;
        userAuth
          .updateProfile({
            displayName,
          })
          .then(() => {
            alert(`Gratulacje ${displayName}, Twoje konto zostało utworzone`);
            createUserDocumentFromUserAuth(userAuth);
            resolve(userAuth);
          });
      })
      .catch(error => {
        alert(error.message);
        reject(error.message);
      });
  });
};
