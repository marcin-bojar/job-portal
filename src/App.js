import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkCurrentUser } from './redux/user/user.actions';

import { fetchAdsSuccess } from './redux/ads/ads.actions';

import { createStructuredSelector } from 'reselect';
import { currentUserSelector } from './redux/user/user.selectors';

import { db } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import LoginPage from './pages/login-register/login-register.component';
import Header from './components/header/header.component';
import LoginFirst from './pages/login-first/login-first.component';
import AddAd from './pages/add-ad/add-ad.component';

import './App.css';

class App extends React.Component {
  unsubscribe = null;

  async componentDidMount() {
    const { checkCurrentUser, fetchAdsSuccess } = this.props;
    checkCurrentUser();

    // const allAds = [];
    // const adsSnapshot = await db.collection('ads').get();

    // adsSnapshot.docs.forEach(async doc => {
    //   const categorySnapshot = await db
    //     .collection('ads')
    //     .doc(doc.id)
    //     .collection('items')
    //     .get();
    //   const categoryAds = categorySnapshot.docs;
    //   categoryAds.forEach(ad => allAds.push(ad.data()));
    // });
    // fetchAdsSuccess(allAds);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/login"
            render={() => (currentUser ? <Redirect to="/" /> : <LoginPage />)}
          />
          <Route
            exact
            path="/add"
            render={() => (currentUser ? <AddAd /> : <LoginFirst />)}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector,
});

const mapDispatchToProps = dispatch => ({
  checkCurrentUser: () => dispatch(checkCurrentUser()),
  fetchAdsSuccess: ads => dispatch(fetchAdsSuccess(ads)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
