import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { filteredAdsSelector } from '../../redux/ads/ads.selectors';

import SearchResultsListItem from '../search-results-list-item/search-results-list-item.component';

import './search-results-list.styles.scss';

const SearchResultsList = ({ filteredAds }) => {
  // let category = null;
  // const categoryMap = {
  //   driver: 'Dla kierowców',
  //   office: 'Praca biurowa',
  //   forklift: 'Dla operatorów',
  //   warehouse: 'Praca na magazynie',
  // };

  return (
    <ul className="search-results-list">
      {Object.keys(filteredAds).map(key => {
        const ad = filteredAds[key];

        return (
          <li className="search-results-list__item" key={ad.id}>
            <SearchResultsListItem {...ad} />
          </li>
        );
      })}
    </ul>
  );
};

const mapStateToProps = createStructuredSelector({
  filteredAds: filteredAdsSelector,
});

export default connect(mapStateToProps)(SearchResultsList);
