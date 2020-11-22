import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { allAdsSelector } from '../../redux/ads/ads.selectors';

import AdContent from '../../components/ad-content/ad-content.component';

import './ad-page.styles.scss';

const AdPage = ({ allAds, match }) => {
  const adId = match.params.adId;
  const ad = allAds[adId];
  const { category } = ad;

  return (
    <div className={`ad-page ${category}`}>
      <AdContent />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allAds: allAdsSelector,
});

export default withRouter(connect(mapStateToProps)(AdPage));
