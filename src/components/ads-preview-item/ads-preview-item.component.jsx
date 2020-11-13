import React from 'react';

import './ads-preview-item.styles.scss';

const AdsPreviewItem = ({
  category,
  title,
  license,
  region,
  system,
  salary,
  currency,
}) => {
  const { fixed, from, to } = salary;
  return (
    <div className="ads-preview-item">
      <div className="ads-preview-item__header">
        <h3 className="ads-preview-item__title">{title}</h3>
        <p className="ads-preview-item__salary">
          {fixed
            ? `${fixed} ${currency}`
            : from && to
            ? `${from} - ${to} ${currency}`
            : null}
        </p>
      </div>
      <div className="ads-preview-item__data">
        {category === 'driver' ? (
          <p className="ads-preview-item__license">Prawo jazdy: {license}</p>
        ) : null}
        <p className="ads-preview-item__system">System pracy: {system}</p>
        <p className="ads-preview-item__region">
          {category === 'driver'
            ? 'Zasięg usług transportowych: '
            : 'Miejsce pracy: '}{' '}
          {region.toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default AdsPreviewItem;
