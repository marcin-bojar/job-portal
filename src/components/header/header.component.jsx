import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { currentUserSelector } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';

import './header.styles.scss';

const Header = ({ currentUser, signOut }) => (
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
        <div className="header__option" onClick={signOut}>
          Wyloguj
        </div>
      )}
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
