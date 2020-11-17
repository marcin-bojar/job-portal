import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  filteredAdsSelector,
  searchInputSelector,
  filtersAppliedSelector,
} from '../../redux/ads/ads.selectors';

import AdsPreviewItem from '../ads-preview-item/ads-preview-item.component';
import AdsPreview from '../ads-preview/ads-preview.component';

import './search-results.styles.scss';

const SearchResults = ({ filteredAds }) => {
  const noResults = Object.keys(filteredAds).length === 0;
  let noResultsMessage;
  let category;
  const categoryMap = {
    driver: 'Dla kierowców',
    office: 'Praca biurowa',
    forklift: 'Dla operatorów',
    warehouse: 'Praca na magazynie',
  };

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

      {!noResults ? (
        Object.keys(filteredAds).map(key => {
          const ad = filteredAds[key];

          if (category !== ad.category) {
            category = ad.category;

            return (
              <div className="search-results__new-category" key={ad.id}>
                <h4 className={`search-results__category-title ${category} `}>
                  {categoryMap[category]}
                </h4>
                <AdsPreviewItem {...ad} />
              </div>
            );
          }

          return <AdsPreviewItem key={ad.id} {...ad} />;
        })
      ) : (
        <AdsPreview />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  filteredAds: filteredAdsSelector,
  searchInputSelector: searchInputSelector,
  filtersApplied: filtersAppliedSelector,
});

export default connect(mapStateToProps)(SearchResults);
