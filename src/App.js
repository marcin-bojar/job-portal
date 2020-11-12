import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { checkCurrentUser } from './redux/user/user.actions';

import { createStructuredSelector } from 'reselect';
import { currentUserSelector } from './redux/user/user.selectors';
import { fetchAdsStart } from './redux/ads/ads.actions';

import HomePage from './pages/homepage/homepage.component';
import LoginPage from './pages/login-register/login-register.component';
import Header from './components/header/header.component';
import LoginFirst from './pages/login-first/login-first.component';
import AddAd from './pages/add-ad/add-ad.component';

import './App.css';

class App extends React.Component {
  unsubscribe = null;

  async componentDidMount() {
    const { checkCurrentUser, fetchAdsStart } = this.props;
    checkCurrentUser();
    fetchAdsStart();
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
  fetchAdsStart: () => dispatch(fetchAdsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
