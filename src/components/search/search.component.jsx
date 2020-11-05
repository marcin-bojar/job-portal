import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import SearchFilter from '../search-filter/search-filter.component';

import { searchInputSelector } from '../../redux/ads/ads.selectors';

import {
  filterAds,
  filterAdsByCategory,
  setAdsFilter,
  removeCategoryFilter,
  noFilter,
} from '../../redux/ads/ads.actions';

import './search.styles.scss';

class Search extends React.Component {
  componentWillUnmount() {
    const { setAdsFilter } = this.props;
    setAdsFilter('');
  }

  handleChange = e => {
    const { value } = e.target;
    const { setAdsFilter, filterAds, noFilter } = this.props;

    if (value) {
      setAdsFilter(value);
      filterAds(value);
    } else {
      noFilter();
    }
  };

  handleCheckboxChange = e => {
    const { filterAdsByCategory, removeCategoryFilter } = this.props;
    const isChecked = e.target.checked;
    const category = e.target.name;

    if (isChecked) {
      filterAdsByCategory(category);
    } else {
      removeCategoryFilter(category);
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
          <SearchFilter
            category="driver"
            handleChange={this.handleCheckboxChange}
            label="kierowca"
          />
          <SearchFilter
            category="forklift"
            handleChange={this.handleCheckboxChange}
            label="wózek"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchInput: searchInputSelector,
});

const mapDispatchToProps = dispatch => ({
  filterAds: filter => dispatch(filterAds(filter)),
  filterAdsByCategory: category => dispatch(filterAdsByCategory(category)),
  setAdsFilter: newFilter => dispatch(setAdsFilter(newFilter)),
  removeCategoryFilter: category => dispatch(removeCategoryFilter(category)),
  noFilter: () => dispatch(noFilter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
