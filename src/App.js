import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createUserProfileDocument, auth } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Checkout from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import './App.css';

function App({ currentUser, setCurrentUser }) {
  React.useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        setCurrentUser(null);
        return;
      }

      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot((snapshot) => {
        setCurrentUser({
          id: snapshot.id,
          ...snapshot.data(),
        });
      });
    });
    return () => unsubscribeFromAuth();
  }, [setCurrentUser]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={Checkout} />
        <Route
          exact
          path="/sign-in"
          render={() => {
            if (currentUser) return <Redirect to="/" />;
            return <SignInAndSignUp />;
          }}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
