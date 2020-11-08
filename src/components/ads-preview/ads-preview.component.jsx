import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  allAdsSelector,
  filteredAdsSelector,
  searchInputSelector,
  filtersAppliedSelector,
} from '../../redux/ads/ads.selectors';

import AdsPreviewItem from '../ads-preview-item/ads-preview-item.component';
import AdsPreviewMiniItem from '../ads-preview-mini-item/ads-preview-mini-item.component';

import './ads-preview.styles.scss';

const AdsPreview = ({
  allAds,
  filteredAds,
  searchInputSelector,
  filtersApplied,
}) => {
  const isFiltered = searchInputSelector.length || filtersApplied;
  const noResults = filteredAds.length === 0;
  const filteredWithResults = isFiltered && !noResults;
  let noResultsMessage;

  if (isFiltered && noResults) {
    noResultsMessage = (
      <div className="ads-preview__no-results">
        <p>Brak wyników dla Twojego wyszukiwania :(</p>
      </div>
    );
  }

  return (
    <div className="ads-preview">
      {noResultsMessage && noResultsMessage}
      <h3 className="ads-preview__title">{` ${
        filteredWithResults ? 'Wynik wyszukiwania:' : 'Najnowsze:'
      }`}</h3>

      {filteredWithResults
        ? filteredAds.map(ad => <AdsPreviewItem key={ad.id} {...ad} />)
        : allAds.map(ad => <AdsPreviewMiniItem key={ad.id} {...ad} />)}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allAds: allAdsSelector,
  filteredAds: filteredAdsSelector,
  searchInputSelector: searchInputSelector,
  filtersApplied: filtersAppliedSelector,
});

export default connect(mapStateToProps)(AdsPreview);
