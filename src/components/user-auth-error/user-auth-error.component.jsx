import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { userErrorSelector } from '../../redux/user/user.selectors';

import { clearUserError } from '../../redux/user/user.actions';

import CustomButton from '../custom-button/custom-button.component';

import './user-auth-error.styles.scss';

const UserAuthError = ({ error, clearUserError }) => {
  if (error) {
    return (
      <div className="user-auth-error">
        <div className="user-auth-error__overlay">
          <div className="user-auth-error__content">
            <h2 className="user-auth-error__title">
              Ups... coś poszło nie tak
            </h2>
            <p className="user-auth-error__msg">{error.message}</p>
            <CustomButton handleClick={clearUserError}>Ok</CustomButton>
          </div>
        </div>
      </div>
    );
  } else return null;
};

const mapStateToProps = createStructuredSelector({
  error: userErrorSelector,
});

const mapDispatchToProps = dispatch => ({
  clearUserError: () => dispatch(clearUserError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthError);
