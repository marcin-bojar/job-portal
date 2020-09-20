import React from 'react';

import './ad-item.styles.scss';

const AdItem = ({
  category,
  title,
  license,
  region,
  system,
  salary,
  currency,
  info,
}) => (
  <div className="ad-item">
    <div className="ad-item__header">
      <h3 className="ad-item__title">{title}</h3>
      <p className="ad-item__salary">
        {salary} {currency}
      </p>
    </div>
    <div className="ad-item__data">
      <p className="ad-item__license">
        {category === 'driver' ? 'Prawo jazdy: ' : null} {license}{' '}
      </p>
      <p className="ad-item__system">System pracy: {system}</p>
      <p className="ad-item__region">
        {category === 'driver'
          ? 'Zasięg usług transportowych: '
          : 'Miejsce pracy: '}{' '}
        {region.toUpperCase()}
      </p>
    </div>
    <div className="ad-item__info">{info}</div>
  </div>
);

export default AdItem;
