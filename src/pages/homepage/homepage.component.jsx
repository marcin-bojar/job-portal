import React from 'react';

import AdsPreview from '../../components/ads-preview/ads-preview.component';

import './homepage.styles.scss';

const HomePage = () => (
  <div className="homepage">
    <div className="hero-header">
      <h1>
        <span className="hero-header__color-letter">C</span>argo{' '}
        <span className="hero-header__color-letter">R</span>unner
      </h1>
      <h2>Praca w logistyce</h2>
    </div>
    <div className="data-container">
      <div className="data-container__ads">
        <AdsPreview />
      </div>
      <div className="data-container__search"></div>
    </div>
  </div>
);

export default HomePage;
