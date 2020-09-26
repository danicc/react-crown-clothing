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

export function convertCollectionSnapshotToMap(collection) {
  const documents = collection.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });
  return documents.reduce((accumulator, document) => {
    const key = document.title.toLowerCase();
    accumulator[key] = document;
    return accumulator;
  }, {});
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signinWithGoogle = () => auth.signInWithPopup(provider);

export async function addCollectionAndDocuments(collectionKey, documents) {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  documents.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  return await batch.commit();
}

export default firebase;
