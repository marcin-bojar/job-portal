import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './login-register.styles.scss';

const LoginPage = () => (
  <div className="login-page">
    <SignIn />
    <div className="login-page__or">
      <p>lub</p>
    </div>
    <SignUp />
  </div>
);
export default LoginPage;
