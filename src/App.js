import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import LoginPage from './pages/login-register/login-register.component';
import Header from './components/header/header.component';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
    </Switch>
  </div>
);
export default App;
