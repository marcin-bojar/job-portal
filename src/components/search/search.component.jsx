import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { searchInputSelector } from '../../redux/ads/ads.selectors';

import { filterAds, setAdsFilter } from '../../redux/ads/ads.actions';

import './search.styles.scss';

class Search extends React.Component {
  componentDidUpdate() {
    const { filterAds, searchInput } = this.props;
    filterAds(searchInput);
  }

  handleChange = e => {
    const { value } = e.target;
    const { setAdsFilter } = this.props;

    setAdsFilter(value);
  };

  render() {
    const { searchInput } = this.props;

    return (
      <div className="search">
        <h2 className="search__title">Wyszukaj ogłoszenia</h2>
        <input
          className="search__input"
          value={searchInput}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  searchInput: searchInputSelector,
});

const mapDispatchToProps = dispatch => ({
  filterAds: filter => dispatch(filterAds(filter)),
  setAdsFilter: newFilter => dispatch(setAdsFilter(newFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
