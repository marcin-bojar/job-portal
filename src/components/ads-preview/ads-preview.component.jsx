import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  allAdsSelector,
  readyToDisplaySelector,
} from '../../redux/ads/ads.selectors';

import AdsPreviewItem from '../ads-preview-item/ads-preview-item.component';

import './ads-preview.styles.scss';

const AdsPreview = ({ allAds, readyToDisplay }) => {
  return (
    <div className="ads-preview">
      <h3 className="ads-preview__title">Najnowsze:</h3>
      {readyToDisplay && (
        <ul className="ads-preview__list">
          {Object.keys(allAds).map((key, i) => {
            const ad = allAds[key];

            return <AdsPreviewItem key={ad.id} custom={i} {...ad} />;
          })}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allAds: allAdsSelector,
  readyToDisplay: readyToDisplaySelector,
});

export default connect(mapStateToProps)(AdsPreview);
