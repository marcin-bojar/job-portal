import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MakeAsyncFunction from 'react-redux-promise-listener';
import * as yup from 'yup';

import { promiseListener } from '../../redux/store';

import FormInputFormik from '../form-input-formik/form-input-formik.component';
import FormError from '../form-error/form-error.component';
import CustomButton from '../custom-button/custom-button.component';

import UserActionTypes from '../../redux/user/user.types';

import './sign-up-formik.styles.scss';

const SignUpSchema = yup.object().shape({
  displayName: yup
    .string()
    .min(2, 'Minimum 2 znaki')
    .max(20, 'Nie więcej niż 20 znaków')
    .required('Pole obowiązkowe'),
  email: yup
    .string()
    .email('Niepoprawny adres email')
    .required('Pole obowiązkowe'),
  password: yup
    .string()
    .min(6, 'Minimum 6 znaków')
    .required('Pole obowiązkowe'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Hasła nie są takie same'),
});

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
          validationSchema={SignUpSchema}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="sign-up__group">
                <Field
                  name="displayName"
                  label="Nazwa"
                  disabled={isSubmitting}
                  error={errors.displayName && touched.displayName}
                  component={FormInputFormik}
                ></Field>
                <ErrorMessage name="displayName" component={FormError} />
              </div>
              <div className="sign-up__group">
                <Field
                  name="email"
                  label="Email"
                  disabled={isSubmitting}
                  error={errors.email && touched.email}
                  component={FormInputFormik}
                />
                <ErrorMessage name="email" component={FormError} />
              </div>
              <div className="sign-up__group">
                <Field
                  name="password"
                  label="Hasło"
                  type="password"
                  disabled={isSubmitting}
                  error={errors.password && touched.password}
                  component={FormInputFormik}
                />
                <ErrorMessage name="password" component={FormError} />
              </div>
              <div className="sign-up__group">
                <Field
                  name="confirmPassword"
                  label="Powtórz hasło"
                  type="password"
                  disabled={isSubmitting}
                  error={errors.confirmPassword && touched.confirmPassword}
                  component={FormInputFormik}
                />
                <ErrorMessage name="confirmPassword" component={FormError} />
              </div>
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
