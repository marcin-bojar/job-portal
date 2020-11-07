import React from 'react';
import { connect } from 'react-redux';

import SearchFilter from '../search-filter/search-filter.component';

import {
  filterAdsByCategory,
  removeCategoryFilter,
  updateFiltersStatus,
} from '../../redux/ads/ads.actions';

import './search-filter-controller.styles.scss';

class SearchFiltersController extends React.Component {
  constructor() {
    super();

    this.state = {
      filters: [
        { id: 1, category: 'driver', label: 'kierowca', checked: false },
        { id: 2, category: 'forklift', label: 'wózek', checked: false },
        { id: 3, category: 'warehouse', label: 'magazyn', checked: false },
      ],
    };
  }

  componentDidUpdate() {
    this.checkFiltersStatus();
  }

  handleFilterChange = e => {
    const { filterAdsByCategory, removeCategoryFilter } = this.props;
    const isChecked = e.target.checked;
    const category = e.target.value;

    const stateUpdater = state =>
      (state.filters = state.filters.map(filter =>
        filter.category === category
          ? { ...filter, checked: isChecked }
          : filter
      ));

    if (isChecked) {
      filterAdsByCategory(category);
      this.setState(stateUpdater);
    } else {
      removeCategoryFilter(category);
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
            {...filter}
          />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  filterAdsByCategory: category => dispatch(filterAdsByCategory(category)),
  removeCategoryFilter: category => dispatch(removeCategoryFilter(category)),
  updateFiltersStatus: areFiltersApplied =>
    dispatch(updateFiltersStatus(areFiltersApplied)),
});

export default connect(null, mapDispatchToProps)(SearchFiltersController);
