import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBC1Zea71KI5_KCveI_ZW4Qbovh05eeTBs',
  authDomain: 'crown-udemy-49d52.firebaseapp.com',
  databaseURL: 'https://crown-udemy-49d52.firebaseio.com',
  projectId: 'crown-udemy-49d52',
  storageBucket: 'crown-udemy-49d52.appspot.com',
  messagingSenderId: '948169171373',
  appId: '1:948169171373:web:63e141c042ec1591448124',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = await firestore.doc(`/users/${userAuth.uid}`);
  const snapshot = userRef.get();

  if (snapshot.exists) return;

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
    console.log('error creating user', error.message);
  }
  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signinWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
