import React from 'react';
import { Link } from 'react-router-dom';

import ReactLogo from '../../assets/Zakaz_wjazdu_znak.svg';

import './login-first.styles.scss';

const LoginFirst = () => (
  <div className="login-first">
    <h2 className="login-first__heading">Nie jesteś zalogowany!</h2>
    <p className="login-first__info">
      <Link className="login-first__link" to="/login">
        Zaloguj się
      </Link>{' '}
      aby dodać ogłoszenie.
    </p>
    <div className="login-first__no-entry">
      <img className="login-first__sign" src={ReactLogo} alt="Zakaz wjazdu" />
    </div>
  </div>
);

export default LoginFirst;
