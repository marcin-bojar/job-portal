import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  allAdsSelector,
  filteredAdsSelector,
} from '../../redux/ads/ads.selectors';

import AdsPreviewItem from '../ads-preview-item/ads-preview-item.component';

import './ads-preview.styles.scss';

const AdsPreview = ({ allAds, filteredAds }) => {
  return (
    <div className="ads-preview">
      <h3 className="ads-preview__title">Najnowsze: </h3>
      {filteredAds.length === 0
        ? allAds.map(ad => <AdsPreviewItem key={ad.id} {...ad} />)
        : filteredAds.map(ad => <AdsPreviewItem key={ad.id} {...ad} />)}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allAds: allAdsSelector,
  filteredAds: filteredAdsSelector,
});

export default connect(mapStateToProps)(AdsPreview);
