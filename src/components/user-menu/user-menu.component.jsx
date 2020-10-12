import React from 'react';
import { connect } from 'react-redux';

import { signOutStart } from '../../redux/user/user.actions';

import './user-menu.styles.scss';

const UserMenu = ({ signOut }) => (
  <div className="user-menu">
    <div className="user-menu__item user-menu__item--logout" onClick={signOut}>
      Wyloguj
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(UserMenu);
