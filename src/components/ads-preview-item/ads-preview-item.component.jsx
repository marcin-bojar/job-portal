import React from 'react';

import { formatDate } from '../../redux/ads/ads.utils';

import './ads-preview-item.styles.scss';

const AdsPreviewMiniItem = ({ title, region, salary, currency, addedAt, category }) => {
  const { fixed, from, to } = salary;
  return (
    <div className={`ads-preview-item ads-preview-item--${category}`}>
      <div className="ads-preview-item__block">
        <h3 className="ads-preview-item__title">{title}</h3>
        <p className="ads-preview-item__region">{region.toUpperCase()}</p>
      </div>
      <div className="ads-preview-item__block ads-preview-item__block--column">
        {salary ? (
          <p className="ads-preview-item__salary">
            {fixed
              ? `${fixed} ${currency}`
              : from && to
              ? `${from} - ${to} ${currency}`
              : null}
          </p>
        ) : null}
        <p className="ads-preview-item__added">
          {formatDate(addedAt.seconds)}
        </p>
      </div>
    </div>
  );
};

export default AdsPreviewMiniItem;
