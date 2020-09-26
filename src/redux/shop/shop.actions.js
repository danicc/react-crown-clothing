import ShopActionTypes from './shop.types';

export function updateCollections(collections) {
  return {
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collections,
  };
}
