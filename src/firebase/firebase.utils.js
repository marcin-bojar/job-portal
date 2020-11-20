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

export const createUserDocumentFromUserAuth = async (
  userAuth,
  additionalData
) => {
  if (!userAuth) return;

  const userRef = db.collection('users').doc(userAuth.uid);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userRef;
};

export const createAdsCollectionsAndDocuments = adsArray => {
  const batch = db.batch();
  adsArray.forEach(ad => {
    // const docRef = db.collection('ads').doc(`${ad.category}-ads`);
    // batch.set(docRef, { category: ad.category });

    const adRef = db
      .collection('ads')
      .doc(`${ad.category}-ads`)
      .collection('items')
      .doc();
    batch.set(adRef, { ...ad, id: adRef.id });
  });

  batch.commit();
};

export const fetchAllAds = async () => {
  try {
    const ads = await db
      .collectionGroup('items')
      .orderBy('addedAt', 'desc')
      .get();
    return Object.assign({}, convertCollectionSnapshotToMap(ads));
  } catch (error) {
    console.log(error);
  }
};

export const fetchTenLatestAdsFromEachCategory = async () => {
  const categories = ['office', 'driver', 'forklift', 'warehouse'];
  let ads = {};

  for (const cat of categories) {
    try {
      const categoryAdsSnapshot = await db
        .collection('ads')
        .doc(`${cat}-ads`)
        .collection('items')
        .orderBy('addedAt', 'desc')
        .limit(10)
        .get();

      Object.assign(ads, convertCollectionSnapshotToMap(categoryAdsSnapshot));
    } catch (error) {
      console.log(error);
    }
  }

  return ads;
};

export const convertCollectionSnapshotToMap = collectionSnapshot => {
  const collectionAds = collectionSnapshot.docs.map(ad => ad.data());

  return collectionAds.reduce((acc, ad) => {
    acc[ad.id] = ad;
    return acc;
  }, {});
};

export const auth = firebase.auth();
auth.useDeviceLanguage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
