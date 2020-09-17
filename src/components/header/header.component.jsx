import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = () => (
  <div className="header">
    <Link to="/" className="header__logo">
      Logo
    </Link>
    <div className="header__options-container">
      <Link className="header__option" to="/">
        Home
      </Link>
      <Link className="header__option" to="/add">
        Dodaj ogłoszenie
      </Link>
      <Link className="header__option" to="login">
        Zaloguj się
      </Link>
    </div>
  </div>
);

export default Header;
