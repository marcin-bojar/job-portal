import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { allAdsSelector } from '../../redux/ads/ads.selectors';

import AdsPreviewItem from '../ads-preview-item/ads-preview-item.component';

import './ads-preview.styles.scss';

const AdsPreview = ({ allAds }) => {
  return (
    <div className="ads-preview">
      <h3 className="ads-preview__title">Najnowsze:</h3>

      {Object.keys(allAds).map(key => {
        const ad = allAds[key];

        return <AdsPreviewItem key={ad.id} {...ad} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allAds: allAdsSelector,
});

export default connect(mapStateToProps)(AdsPreview);
