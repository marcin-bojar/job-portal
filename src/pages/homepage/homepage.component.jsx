import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  searchInputSelector,
  filtersAppliedSelector,
  isFetchingSelector,
} from '../../redux/ads/ads.selectors';

import AdsPreview from '../../components/ads-preview/ads-preview.component';
import Search from '../../components/search/search.component';
import withLoader from '../../components/with-loader/with-loader.component';

import './homepage.styles.scss';

const AdsPreviewWithLoader = withLoader(AdsPreview);

const HomePage = ({ searchInput, filtersApplied, isFetching }) => {
  const hide = searchInput.length > 0 || filtersApplied;

  return (
    <div className={`${hide ? 'hide-header' : ''} homepage`}>
      <div className="hero-header">
        <h1>
          <span className="hero-header__color-letter">C</span>argo{' '}
          <span className="hero-header__color-letter">R</span>unner
        </h1>
        <h2>Praca w logistyce</h2>
      </div>
      <div className="data-container">
        <div className="data-container__ads">
          <AdsPreviewWithLoader isLoading={isFetching} />
        </div>
        <div className="data-container__search">
          <Search />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  searchInput: searchInputSelector,
  filtersApplied: filtersAppliedSelector,
  isFetching: isFetchingSelector,
});

export default connect(mapStateToProps)(HomePage);
