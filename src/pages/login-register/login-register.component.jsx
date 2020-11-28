import React from 'react';

import SignInFormik from '../../components/sign-in-formik/sign-in-formik.component';
import SignUpFormik from '../../components/sign-up-formik/sign-up-formik.component';

import './login-register.styles.scss';

const LoginPage = () => (
  <div className="login-page">
    <SignInFormik />
    <div className="login-page__or">
      <p>lub</p>
    </div>
    <SignUpFormik />
  </div>
);
export default LoginPage;
