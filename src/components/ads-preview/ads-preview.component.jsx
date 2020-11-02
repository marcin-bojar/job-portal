import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  allAdsSelector,
  filteredAdsSelector,
  searchInputSelector,
} from '../../redux/ads/ads.selectors';

import AdsPreviewItem from '../ads-preview-item/ads-preview-item.component';

import './ads-preview.styles.scss';

const AdsPreview = ({ allAds, filteredAds, searchInputSelector }) => {
  const isFiltered = searchInputSelector.length > 0;
  const noResults = filteredAds.length === 0;

  let noResultsMessage = (
    <div className="ads-preview__no-results">
      <p>Brak wyników dla Twojego wyszukiwania :(</p>
    </div>
  );

  if (isFiltered && noResults) {
    return (
      <div className="ads-preview">
        {noResultsMessage}
        <h3 className="ads-preview__title">Najnowsze: </h3>
        {allAds.map(ad => (
          <AdsPreviewItem key={ad.id} {...ad} />
        ))}
      </div>
    );
  }

  return (
    <div className="ads-preview">
      <h3 className="ads-preview__title">{` ${
        isFiltered ? 'Wynik wyszukiwania:' : 'Najnowsze:'
      }`}</h3>

      {isFiltered
        ? filteredAds.map(ad => <AdsPreviewItem key={ad.id} {...ad} />)
        : allAds.map(ad => <AdsPreviewItem key={ad.id} {...ad} />)}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  allAds: allAdsSelector,
  filteredAds: filteredAdsSelector,
  searchInputSelector: searchInputSelector,
});

export default connect(mapStateToProps)(AdsPreview);
