import React from 'react';

import './ads-preview-mini-item.styles.scss';

const AdsPreviewMiniItem = ({ title, region, salary, currency }) => {
  const { fixed, from, to } = salary;
  return (
    <div className="ads-preview-mini-item">
      <div className="ads-preview-mini-item__block">
        <h3 className="ads-preview-mini-item__title">{title}</h3>
        <p className="ads-preview-mini-item__region">{region.toUpperCase()}</p>
      </div>

      {salary ? (
        <p className="ads-preview-mini-item__salary">
          {fixed
            ? `${fixed} ${currency}`
            : from && to
            ? `${from} - ${to} ${currency}`
            : null}
        </p>
      ) : null}
    </div>
  );
};

export default AdsPreviewMiniItem;
