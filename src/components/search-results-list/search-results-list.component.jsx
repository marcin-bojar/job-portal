import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { filteredAdsSelector } from '../../redux/ads/ads.selectors';

import SearchResultsListItem from '../search-results-list-item/search-results-list-item.component';

import './search-results-list.styles.scss';

const SearchResultsList = ({ filteredAds }) => {
  const [animationStartIndex, setAnimationStartIndex] = useState(0);

  useEffect(() => {
    setAnimationStartIndex(Object.keys(filteredAds).length - 1);
  }, [animationStartIndex]);

  return (
    <ul className="search-results-list">
      {Object.keys(filteredAds).map((key, i) => {
        const ad = filteredAds[key];

        return (
          <SearchResultsListItem
            key={ad.id}
            custom={i - animationStartIndex}
            {...ad}
          />
        );
      })}
    </ul>
  );
};

const mapStateToProps = createStructuredSelector({
  filteredAds: filteredAdsSelector,
});

export default connect(mapStateToProps)(SearchResultsList);
