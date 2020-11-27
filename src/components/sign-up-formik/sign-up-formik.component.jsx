import React from 'react';
import { Formik, Form, Field } from 'formik';
import MakeAsyncFunction from 'react-redux-promise-listener';

import { promiseListener } from '../../redux/store';

import FormInputFormik from '../form-input-formik/form-input-formik.component';
import CustomButton from '../custom-button/custom-button.component';

import UserActionTypes from '../../redux/user/user.types';

import './sign-up-formik.styles.scss';

const SignUpFormik = () => (
  <div className="sign-up">
    <h2 className="sign-up__title">Zarejestruj się</h2>
    <MakeAsyncFunction
      listener={promiseListener}
      start={UserActionTypes.SIGN_UP_START}
      resolve={UserActionTypes.SIGN_UP_SUCCESS}
      reject={UserActionTypes.SIGN_UP_FAILURE}
    >
      {asyncSubmit => (
        <Formik
          initialValues={{
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={asyncSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="displayName"
                label="Nazwa"
                disabled={isSubmitting}
                component={FormInputFormik}
              />
              <Field
                name="email"
                label="Email"
                disabled={isSubmitting}
                component={FormInputFormik}
              />
              <Field
                name="password"
                label="Hasło"
                type="password"
                disabled={isSubmitting}
                component={FormInputFormik}
              />
              <Field
                name="confirmPassword"
                label="Powtórz hasło"
                type="password"
                disabled={isSubmitting}
                component={FormInputFormik}
              />
              <div className="button-wrapper">
                <CustomButton type="submit" disabled={isSubmitting}>
                  Zarejestruj
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </MakeAsyncFunction>
  </div>
);

export default SignUpFormik;
