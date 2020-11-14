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
  const noResults = Object.keys(filteredAds).length === 0;
  const filteredWithResults = isFiltered && !noResults;
  let noResultsMessage;
  let category;
  const categoryMap = {
    driver: 'Dla kierowców',
    office: 'Praca biurowa',
    forklift: 'Dla operatorów',
    warehouse: 'Praca na magazynie',
  };

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
        ? Object.keys(filteredAds).map(key => {
            const ad = filteredAds[key];

            if (category !== ad.category) {
              category = ad.category;

              return (
                <div className="ads-preview__new-category" key={ad.id}>
                  <h4 className={`ads-preview__category-title ${category} `}>
                    {categoryMap[category]}
                  </h4>
                  <AdsPreviewItem {...ad} />
                </div>
              );
            }

            return <AdsPreviewItem key={ad.id} {...ad} />;
          })
        : Object.keys(allAds).map(key => {
            const ad = allAds[key];

            if (category !== ad.category) {
              category = ad.category;

              return (
                <div className="ads-preview__new-category" key={ad.id}>
                  <h4 className={`ads-preview__category-title ${category} `}>
                    {categoryMap[category]}
                  </h4>
                  <AdsPreviewMiniItem {...ad} />
                </div>
              );
            }

            return <AdsPreviewMiniItem key={ad.id} {...ad} />;
          })}
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
