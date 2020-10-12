import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import UserMenu from '../user-menu/user-menu.component';

import {
  currentUserSelector,
  userMenuHiddenSelector,
} from '../../redux/user/user.selectors';
import { toggleUserMenu } from '../../redux/user/user.actions';

import './header.styles.scss';

const Header = ({ currentUser, toggleUserMenu, userMenuHidden }) => (
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
        <div className="header__option" onClick={toggleUserMenu}>
          {currentUser.displayName}
        </div>
      )}
      {userMenuHidden ? null : <UserMenu />}
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: currentUserSelector,
  userMenuHidden: userMenuHiddenSelector,
});

const mapDispatchToProps = dispatch => ({
  toggleUserMenu: () => dispatch(toggleUserMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
