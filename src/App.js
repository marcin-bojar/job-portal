import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkCurrentUser } from './redux/user/user.actions';

import { createStructuredSelector } from 'reselect';
import { currentUserSelector } from './redux/user/user.selectors';
import { isFetchingSelector } from './redux/ads/ads.selectors';
import { fetchAdsStart, fetchTenLatestAdsStart } from './redux/ads/ads.actions';

import HomePage from './pages/homepage/homepage.component';
import LoginPage from './pages/login-register/login-register.component';
import Header from './components/header/header.component';
import LoginFirst from './pages/login-first/login-first.component';
import AddAdPage from './pages/add-ad-page/add-ad-page.component';
import AdPage from './pages/ad-page/ad-page.component';
import withLoader from './components/with-loader/with-loader.component';

// import ADS from './ADS_DATA';
// import { createAdsCollectionsAndDocuments } from './firebase/firebase.utils';

import './App.css';

const AdPageWithLoader = withLoader(AdPage);

class App extends React.Component {
  unsubscribe = null;

  componentDidMount() {
    const { checkCurrentUser, fetchTenLatestAds /*fetchAds*/ } = this.props;
    checkCurrentUser();
    // fetchAds();
    fetchTenLatestAds();

    // createAdsCollectionsAndDocuments(ADS);
  }

  render() {
    const { currentUser, isFetching } = this.props;
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
            render={() => (currentUser ? <AddAdPage /> : <LoginFirst />)}
          />
          <Route
            exact
            path="/ads/:adId"
            render={() => <AdPageWithLoader isLoading={isFetching} />}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector,
  isFetching: isFetchingSelector,
});

const mapDispatchToProps = dispatch => ({
  checkCurrentUser: () => dispatch(checkCurrentUser()),
  fetchAds: () => dispatch(fetchAdsStart()),
  fetchTenLatestAds: () => dispatch(fetchTenLatestAdsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
