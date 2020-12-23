import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { motion } from 'framer-motion';

import {
  allAdsSelector,
  sortedAdsSelector,
} from '../../redux/ads/ads.selectors';

import slideInAdItem from '../../framer-motion/variants/slide-in-ad-item';

import AdsPreviewItem from '../ads-preview-item/ads-preview-item.component';

import './ads-preview.styles.scss';

const AdsPreview = ({ allAds, sortedAds }) => {
  return (
    <div className="ads-preview">
      <h3 className="ads-preview__title">Najnowsze:</h3>
      <ul className="ads-preview__list">
        {Object.keys(allAds).map((key, i) => {
          const ad = allAds[key];

          return (
            <motion.li
              key={i} // TODO change to ad id and sort first before displaying !!! (to animate ad item entry in order of apperance)
              variants={slideInAdItem}
              animate={'visible'}
              initial={'hidden'}
              custom={i}
              className="ads-preview__list-item"
            >
              <AdsPreviewItem {...ad} />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allAds: allAdsSelector,
  sortedAds: sortedAdsSelector,
});

export default connect(mapStateToProps)(AdsPreview);
