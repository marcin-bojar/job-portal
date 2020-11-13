import React from 'react';

import { formatDate } from '../../redux/ads/ads.utils';

import './ads-preview-item.styles.scss';

const AdsPreviewItem = ({
  category,
  title,
  license,
  region,
  system,
  salary,
  currency,
  addedAt,
}) => {
  const { fixed, from, to } = salary;
  return (
    <div className="ads-preview-item">
      <div className="ads-preview-item__header">
        <h3 className="ads-preview-item__title">{title}</h3>
        <div className="ads-preview-item__block ads-preview-item__block--column">
          <p className="ads-preview-item__salary">
            {fixed
              ? `${fixed} ${currency}`
              : from && to
              ? `${from} - ${to} ${currency}`
              : null}
          </p>
          <p className="ads-preview-item__added">
            {formatDate(addedAt.seconds)}
          </p>
        </div>
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
