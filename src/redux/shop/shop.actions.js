import ShopActionTypes from './shop.types';

import {
  firestore,
  convertCollectionSnapshotToMap,
} from '../../firebase/firebase.utils';

export function fetchCollectionsStart() {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
  };
}

export function fetchCollectionsSuccess(collections) {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections,
  };
}

export function fetchCollectionsFailure(errorMessage) {
  return {
    type: ShopActionTypes.FETCH_COLLECTIONS_ERROR,
    payload: errorMessage,
  };
}

export function fetchCollectionsStartAsync() {
  return async function (dispatch) {
    const collectionsRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());
    collectionsRef
      .get()
      .then((snapshot) => {
        const collections = convertCollectionSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collections));
      })
      .catch((e) => {
        dispatch(
          fetchCollectionsFailure(`Error getting collections: ${e.message}`)
        );
      });
  };
}
