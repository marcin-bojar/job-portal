import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkCurrentUser } from './redux/user/user.actions';

import { createStructuredSelector } from 'reselect';
import { currentUserSelector } from './redux/user/user.selectors';
import { fetchAdsStart, fetchTenLatestAdsStart } from './redux/ads/ads.actions';

import HomePage from './pages/homepage/homepage.component';
import LoginPage from './pages/login-register/login-register.component';
import Header from './components/header/header.component';
import LoginFirst from './pages/login-first/login-first.component';
import AddAd from './pages/add-ad/add-ad.component';
import AdPage from './pages/ad-page/ad-page.component';

import ADS from './ADS_DATA';
import { createAdsCollectionsAndDocuments } from './firebase/firebase.utils';

import './App.css';

class App extends React.Component {
  unsubscribe = null;

  componentDidMount() {
    const { checkCurrentUser, fetchAds, fetchTenLatestAds } = this.props;
    checkCurrentUser();
    fetchAds();
    // fetchTenLatestAds();

    // createAdsCollectionsAndDocuments(ADS);
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
          <Route exact path="/ads/:adId" component={AdPage} />
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
  fetchAds: () => dispatch(fetchAdsStart()),
  fetchTenLatestAds: () => dispatch(fetchTenLatestAdsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
