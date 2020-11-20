import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { sortedAdsSelector } from '../../redux/ads/ads.selectors';

import AdsPreviewItem from '../ads-preview-item/ads-preview-item.component';

import './ads-preview.styles.scss';

const AdsPreview = ({ sortedAds }) => {
  return (
    <div className="ads-preview">
      <h3 className="ads-preview__title">Najnowsze:</h3>

      {sortedAds.map(ad => (
        <AdsPreviewItem key={ad.id} {...ad} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sortedAds: sortedAdsSelector,
});

export default connect(mapStateToProps)(AdsPreview);
