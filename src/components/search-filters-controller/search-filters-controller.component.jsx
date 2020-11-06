import React from 'react';
import { connect } from 'react-redux';

import SearchFilter from '../search-filter/search-filter.component';

import {
  filterAdsByCategory,
  removeCategoryFilter,
} from '../../redux/ads/ads.actions';

import './search-filter-controller.styles.scss';

class SearchFiltersController extends React.Component {
  constructor() {
    super();

    this.state = {
      filtersApplied: false,
      filters: [
        { id: 1, category: 'driver', label: 'kierowca', checked: false },
        { id: 2, category: 'forklift', label: 'wózek', checked: false },
        { id: 3, category: 'warehouse', label: 'magazyn', checked: false },
      ],
    };
  }

  handleFilterChange = e => {
    const { filterAdsByCategory, removeCategoryFilter } = this.props;
    const isChecked = e.target.checked;
    const category = e.target.value;

    if (isChecked) {
      filterAdsByCategory(category);
      this.setState(
        state =>
          (state.filters = state.filters.map(filter =>
            filter.category === category
              ? { ...filter, checked: isChecked }
              : filter
          )),
        () => this.checkFiltersStatus()
      );
    } else {
      removeCategoryFilter(category);
      this.setState(
        state =>
          (state.filters = state.filters.map(filter =>
            filter.category === category
              ? { ...filter, checked: isChecked }
              : filter
          )),
        () => this.checkFiltersStatus()
      );
    }
  };

  checkFiltersStatus = () => {
    const { filters } = this.state;
    const isFiltered = filters.some(filter => filter.checked === true);

    if (isFiltered) this.setState({ filtersApplied: true });
    else this.setState({ filtersApplied: false });
  };

  render() {
    const { filters } = this.state;
    return (
      <div className="search-filter-controller">
        {filters.map(filter => (
          <SearchFilter
            key={filter.id}
            category={filter.category}
            handleChange={this.handleFilterChange}
            label={filter.label}
          />
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  filterAdsByCategory: category => dispatch(filterAdsByCategory(category)),
  removeCategoryFilter: category => dispatch(removeCategoryFilter(category)),
});

export default connect(null, mapDispatchToProps)(SearchFiltersController);
