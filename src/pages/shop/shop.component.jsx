import React from 'react';
import { Route } from 'react-router-dom';

import './shop.styles.scss';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import Collection from '../collection/collection.component';

function Shop({ match }) {
  return (
    <div className="shop-page">
      <Route exact path={match.path} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={Collection} />
    </div>
  );
}

export default Shop;
