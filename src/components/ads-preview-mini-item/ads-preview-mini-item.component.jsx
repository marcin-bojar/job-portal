import React from 'react';

import './ads-preview-mini-item.styles.scss';

const AdsPreviewMiniItem = ({ title, region, salary, currency }) => (
  <div className="ads-preview-mini-item">
    <h3 className="ads-preview-mini-item__title">{title}</h3>
    <p className="ads-preview-mini-item__region">{region.toUpperCase()}</p>

    {salary ? (
      <p className="ads-preview-mini-item__salary">{`${salary} ${currency}`}</p>
    ) : null}
  </div>
);

export default AdsPreviewMiniItem;
