import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MakeAsyncFunction from 'react-redux-promise-listener';
import * as yup from 'yup';

import { promiseListener } from '../../redux/store';

import FormInputFormik from '../form-input-formik/form-input-formik.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart } from '../../redux/user/user.actions';

import UserActionTypes from '../../redux/user/user.types';

import './sign-in-formik.styles.scss';

const SignInFormik = ({ googleSignIn }) => (
  <MakeAsyncFunction
    listener={promiseListener}
    start={UserActionTypes.EMAIL_SIGN_IN_START}
    resolve={UserActionTypes.SIGN_IN_SUCCESS}
    reject={UserActionTypes.SIGN_IN_FAILURE}
  >
    {asyncSubmit => (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={asyncSubmit}
      >
        {({ isSubmitting }) => (
          <div className="sign-in">
            <h2 className="sign-in__title">Zaloguj się</h2>
            <Form>
              <div className="sign-in__group">
                <Field
                  name="email"
                  label="Email"
                  disabled={isSubmitting}
                  component={FormInputFormik}
                />
                <ErrorMessage name="email" />
              </div>
              <div className="sign-in__group">
                <Field
                  name="password"
                  label="Hasło"
                  disabled={isSubmitting}
                  component={FormInputFormik}
                />
                <ErrorMessage name="password" />
              </div>
              <div className="button-wrapper">
                <CustomButton type="submit" disabled={isSubmitting}>
                  Zaloguj
                </CustomButton>
                <CustomButton
                  type="button"
                  isGoogleSignIn
                  disabled={isSubmitting}
                  handleClick={googleSignIn}
                >
                  Zaloguj z Google
                </CustomButton>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    )}
  </MakeAsyncFunction>
);

const mapDispatchToProps = dispatch => ({
  googleSignIn: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignInFormik);
