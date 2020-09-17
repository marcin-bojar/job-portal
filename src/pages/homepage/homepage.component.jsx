import React from 'react';

import './homepage.styles.scss';

const HomePage = () => (
  <div className="homepage">
    <div className="heading">
      <h1>
        <span className="heading__red-letter">C</span>argo{' '}
        <span className="heading__red-letter">R</span>unner
      </h1>
      <h2>Praca w logistyce</h2>
    </div>
    <div className="filters"></div>
  </div>
);

export default HomePage;
