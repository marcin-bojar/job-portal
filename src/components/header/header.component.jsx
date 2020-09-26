import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';

const Header = ({ currentUser }) => (
  <div className="header">
    <Link to="/" className="header__logo">
      Logo
    </Link>
    <div className="header__options-container">
      <Link className="header__option" to="/">
        Home
      </Link>
      <Link className="header__option primary" to="/add">
        Dodaj ogłoszenie
      </Link>
      {!currentUser ? (
        <Link className="header__option" to="login">
          Zaloguj się
        </Link>
      ) : (
        <div className="header__option" onClick={() => auth.signOut()}>
          Wyloguj
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
