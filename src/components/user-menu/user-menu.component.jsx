import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import transitions from '../../framer-motion/transitions/roll-in';

import { signOutStart } from '../../redux/user/user.actions';

import './user-menu.styles.scss';

const UserMenu = ({ signOut }) => (
  <motion.div
    key="user-menu"
    initial={{ scaleY: 0, transformOrigin: 'top' }}
    animate={{ scaleY: 1 }}
    exit={{ scaleY: 0 }}
    transition={transitions}
    className="user-menu"
  >
    <div className="user-menu__item user-menu__item--logout" onClick={signOut}>
      Wyloguj
    </div>
  </motion.div>
);

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(null, mapDispatchToProps)(UserMenu);
