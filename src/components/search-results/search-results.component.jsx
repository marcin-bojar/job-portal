import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { filteredAdsSelector } from '../../redux/ads/ads.selectors';

import AdsPreview from '../ads-preview/ads-preview.component';
import SearchResultsList from '../search-results-list/search-results-list.component';

import './search-results.styles.scss';

const SearchResults = ({ filteredAds }) => {
  const noResults = Object.keys(filteredAds).length === 0;
  let noResultsMessage = null;

  if (noResults) {
    noResultsMessage = (
      <div className="search-results__no-results">
        <p>Brak wyników dla Twojego wyszukiwania :(</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h3 className="search-results__title">Wynik wyszukiwania:</h3>
      {noResultsMessage && noResultsMessage}
      {noResults ? <AdsPreview /> : <SearchResultsList />}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  filteredAds: filteredAdsSelector,
});

export default connect(mapStateToProps)(SearchResults);
