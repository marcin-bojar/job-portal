import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { searchInputSelector } from '../../redux/ads/ads.selectors';

import SearchFilter from '../search-filter/search-filter.component';

import {
  filterAdsByCategory,
  removeCategoryFilter,
  updateFiltersStatus,
} from '../../redux/ads/ads.actions';

import './search-filters-controller.styles.scss';

class SearchFiltersController extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: [
        { id: 1, category: 'office', checked: false },
        { id: 2, category: 'driver', checked: false },
        { id: 3, category: 'forklift', checked: false },
        { id: 4, category: 'warehouse', checked: false },
      ],
    };
  }

  componentDidUpdate() {
    this.checkFiltersStatus();
  }

  handleFilterChange = e => {
    const {
      filterAdsByCategory,
      removeCategoryFilter,
      searchInput,
    } = this.props;
    const isChecked = e.target.checked;
    const category = e.target.value;

    // filter by category and (if present) by search input at once
    const filter = { category, searchInput };

    const stateUpdater = state =>
      (state.filters = state.filters.map(filter =>
        filter.category === category
          ? { ...filter, checked: isChecked }
          : filter
      ));

    if (isChecked) {
      filterAdsByCategory(filter);
      this.setState(stateUpdater);
    } else {
      removeCategoryFilter(filter);
      this.setState(stateUpdater);
    }
  };

  checkFiltersStatus = () => {
    const { filters } = this.state;
    const { updateFiltersStatus } = this.props;
    const isFiltered = filters.some(filter => filter.checked === true);

    updateFiltersStatus(isFiltered);
  };

  render() {
    const { filters } = this.state;
    return (
      <div className="search-filter-controller">
        {filters.map(filter => (
          <SearchFilter
            key={filter.id}
            handleChange={this.handleFilterChange}
            icon={filter.category}
            {...filter}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchInput: searchInputSelector,
});

const mapDispatchToProps = dispatch => ({
  filterAdsByCategory: category => dispatch(filterAdsByCategory(category)),
  removeCategoryFilter: category => dispatch(removeCategoryFilter(category)),
  updateFiltersStatus: areFiltersApplied =>
    dispatch(updateFiltersStatus(areFiltersApplied)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFiltersController);
