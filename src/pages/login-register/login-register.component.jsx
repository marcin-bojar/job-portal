import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import SignUpFormik from '../../components/sign-up-formik/sign-up-formik.component';

import './login-register.styles.scss';

const LoginPage = () => (
  <div className="login-page">
    <SignIn />
    <div className="login-page__or">
      <p>lub</p>
    </div>
    <SignUpFormik />
  </div>
);
export default LoginPage;
