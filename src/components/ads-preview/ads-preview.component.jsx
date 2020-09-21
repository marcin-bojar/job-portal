import React from 'react';

import ADS_DATA from '../../ADS_DATA';

import AdItem from '../ad-item/ad-item.component';

import './ads-preview.styles.scss';

const AdsPreview = () => {
  const { ads } = ADS_DATA;

  return (
    <div className="ads-preview">
      {ads
        .filter((ad, i) => i < 4)
        .map(ad => (
          <AdItem key={ad.id} {...ad} />
        ))}
    </div>
  );
};

export default AdsPreview;
