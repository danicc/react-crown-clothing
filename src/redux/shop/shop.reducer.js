import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: undefined,
};

function shopReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS: {
      return {
        ...state,
        collections: action.payload,
      };
    }
    case ShopActionTypes.FETCH_COLLECTIONS_ERROR: {
      return {
        ...state,
        collections: null,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
}

export default shopReducer;
