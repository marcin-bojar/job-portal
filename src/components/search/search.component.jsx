import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
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

  handleKeyPress = e => {
    const { setAdsFilter, clearFilteredAds } = this.props;

    // Deleting whole input with one backspace hit
    if (e.keyCode === 8) {
      setAdsFilter('');
      clearFilteredAds();
    }
  };

  render() {
    let { searchInput, isFetching } = this.props;

    return (
      <div className="search">
        <h2 className="search__title">Wyszukaj ogłoszenia</h2>
        <FormInput
          disabled={isFetching}
          value={searchInput}
          onChange={this.handleChange}
          width={60}
          handleKeyPress={this.handleKeyPress}
        ></FormInput>

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
