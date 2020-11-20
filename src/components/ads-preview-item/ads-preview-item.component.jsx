import React from 'react';
import { Link } from 'react-router-dom';

import { formatDate } from '../../redux/ads/ads.utils';

import './ads-preview-item.styles.scss';

const AdsPreviewItem = ({
  title,
  region,
  salary,
  currency,
  addedAt,
  category,
  id,
}) => {
  const { fixed, from, to } = salary;
  return (
    <Link
      to={`/ads/${id}`}
      className={`ads-preview-item ads-preview-item--${category}`}
    >
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
        <p className="ads-preview-item__added">{formatDate(addedAt.seconds)}</p>
      </div>
    </Link>
  );
};

export default AdsPreviewItem;
