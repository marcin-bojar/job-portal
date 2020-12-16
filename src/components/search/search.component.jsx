import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInputFormik from '../form-input-formik/form-input-formik.component';
import SearchFilterController from '../search-filters-controller/search-filters-controller.component';

import {
  searchInputSelector,
  filtersAppliedSelector,
  isFetchingSelector,
} from '../../redux/ads/ads.selectors';

import {
  filterAds,
  setAdsFilter,
  clearFilteredAds,
  clearAllFilters,
} from '../../redux/ads/ads.actions';

import './search.styles.scss';

class Search extends React.Component {
  // componentWillUnmount() {
  //   const { clearAllFilters } = this.props;
  //   clearAllFilters();
  // }

  handleChange = e => {
    const { value } = e.target;
    const { setAdsFilter, filterAds, clearFilteredAds } = this.props;

    if (value) {
      setAdsFilter(value);
      filterAds(value);
    } else {
      setAdsFilter(value);
      clearFilteredAds();
    }
  };

  backspacePress = e => {
    const { setAdsFilter, clearFilteredAds } = this.props;

    // Deleting whole input with one backspace hit
    if (e.key !== undefined) {
      if (e.key === 'Backspace') {
        setAdsFilter('');
        clearFilteredAds();
      }
    } else if (e.keyCode !== undefined || e.which !== undefined) {
      if (e.keyCode === 8 || e.which === 8) {
        setAdsFilter('');
        clearFilteredAds();
      }
    }
  };

  render() {
    let { searchInput, isFetching } = this.props;

    return (
      <div className="search">
        <h2 className="search__title">Wyszukaj ogłoszenia</h2>
        <FormInputFormik
          disabled={isFetching}
          value={searchInput}
          onChange={this.handleChange}
          handleKeyPress={this.backspacePress}
        ></FormInputFormik>

        <div className="search__filters">
          <SearchFilterController />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchInput: searchInputSelector,
  filtersApplied: filtersAppliedSelector,
  isFetching: isFetchingSelector,
});

const mapDispatchToProps = dispatch => ({
  filterAds: filter => dispatch(filterAds(filter)),
  setAdsFilter: newFilter => dispatch(setAdsFilter(newFilter)),
  clearFilteredAds: () => dispatch(clearFilteredAds()),
  clearAllFilters: () => dispatch(clearAllFilters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
