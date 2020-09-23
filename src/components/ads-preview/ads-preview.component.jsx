import React from 'react';

import ADS_DATA from '../../ADS_DATA';

import AdsPreviewItem from '../ads-preview-item/ads-preview-item.component';

import './ads-preview.styles.scss';

const AdsPreview = () => {
  const { ads } = ADS_DATA;

  return (
    <div className="ads-preview">
      <h3 className="ads-preview__title">Najnowsze: </h3>
      {ads
        .filter((ad, i) => i < 4)
        .map(ad => (
          <AdsPreviewItem key={ad.id} {...ad} />
        ))}
    </div>
  );
};

export default AdsPreview;
