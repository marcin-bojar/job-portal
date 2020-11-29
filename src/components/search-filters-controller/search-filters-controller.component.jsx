import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {
  searchInputSelector,
  isFetchingSelector,
  filtersSelector,
} from '../../redux/ads/ads.selectors';

import SearchFilter from '../search-filter/search-filter.component';

import {
  filterAdsByCategory,
  removeCategoryFilter,
  updateFilter,
  updateFiltersStatus,
} from '../../redux/ads/ads.actions';

import './search-filters-controller.styles.scss';

class SearchFiltersController extends React.Component {
  componentDidUpdate() {
    this.checkFiltersStatus();
  }

  handleFilterChange = e => {
    const {
      filterAdsByCategory,
      updateFilter,
      removeCategoryFilter,
      searchInput,
    } = this.props;
    const isChecked = e.target.checked;
    const category = e.target.value;

    // filter by category and (if present) by search input at once
    const filter = { category, searchInput };

    if (isChecked) filterAdsByCategory(filter);
    else removeCategoryFilter(filter);

    // update filter status
    updateFilter({ category, isChecked });
  };

  checkFiltersStatus = () => {
    const { updateFiltersStatus, filters } = this.props;
    const isFiltered = Object.keys(filters).some(
      key => filters[key].checked === true
    );

    updateFiltersStatus(isFiltered);
  };

  render() {
    const { isFetching, filters } = this.props;

    return (
      <div className="search-filter-controller">
        <h3 className="search-filter-controller__title">Kategorie</h3>
        <div className="search-filter-controller__filters">
          {Object.keys(filters).map(category => {
            const filter = filters[category];

            return (
              <SearchFilter
                key={filter.id}
                disabled={isFetching}
                category={category}
                icon={category}
                handleChange={this.handleFilterChange}
                {...filter}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchInput: searchInputSelector,
  isFetching: isFetchingSelector,
  filters: filtersSelector,
});

const mapDispatchToProps = dispatch => ({
  filterAdsByCategory: category => dispatch(filterAdsByCategory(category)),
  removeCategoryFilter: category => dispatch(removeCategoryFilter(category)),
  updateFilter: status => dispatch(updateFilter(status)),
  updateFiltersStatus: areFiltersApplied =>
    dispatch(updateFiltersStatus(areFiltersApplied)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFiltersController);
