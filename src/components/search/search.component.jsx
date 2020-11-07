import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import SearchFilterController from '../search-filters-controller/search-filters-controller.component';

import {
  searchInputSelector,
  filtersAppliedSelector,
} from '../../redux/ads/ads.selectors';

import {
  filterAds,
  setAdsFilter,
  clearFilteredAds,
} from '../../redux/ads/ads.actions';

import './search.styles.scss';

class Search extends React.Component {
  componentWillUnmount() {
    const { setAdsFilter } = this.props;
    setAdsFilter('');
  }

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

  render() {
    let { searchInput } = this.props;

    return (
      <div className="search">
        <h2 className="search__title">Wyszukaj ogłoszenia</h2>
        <FormInput
          value={searchInput}
          onChange={this.handleChange}
          width={60}
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
});

const mapDispatchToProps = dispatch => ({
  filterAds: filter => dispatch(filterAds(filter)),
  setAdsFilter: newFilter => dispatch(setAdsFilter(newFilter)),
  clearFilteredAds: () => dispatch(clearFilteredAds()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
