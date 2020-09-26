import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

import { auth, db } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import LoginPage from './pages/login-register/login-register.component';
import Header from './components/header/header.component';

import './App.css';

class App extends React.Component {
  unsubscribe = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await db.collection('users').doc(user.uid).get();
        if (userRef.exists) {
          const userSnapshot = userRef.data();
          setCurrentUser(userSnapshot);
        }
      } else {
        setCurrentUser(user);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
