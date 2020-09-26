import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './shop.styles.scss';

import {
  firestore,
  convertCollectionSnapshotToMap,
} from '../../firebase/firebase.utils';
import { updateCollections as updateCollectionsActionCreator } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import Collection from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionWithSpinner = WithSpinner(Collection);

function Shop({ match, updateCollections }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionsRef = firestore.collection('collections');

    const unsubscribeCollections = collectionsRef.onSnapshot(async function (
      snapshot
    ) {
      const collections = convertCollectionSnapshotToMap(snapshot);
      console.log({ collections });
      updateCollections(collections);
      setLoading(false);
    });

    return () => unsubscribeCollections();
  }, [updateCollections]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={match.path}
        render={({ match, location, history }) => (
          <CollectionsOverviewWithSpinner
            isLoading={loading}
            match={match}
            location={location}
            history={history}
          />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={({ match, location, history }) => (
          <CollectionWithSpinner
            isLoading={loading}
            match={match}
            location={location}
            history={history}
          />
        )}
      />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    updateCollections: (collections) =>
      dispatch(updateCollectionsActionCreator(collections)),
  };
}

export default connect(null, mapDispatchToProps)(Shop);
