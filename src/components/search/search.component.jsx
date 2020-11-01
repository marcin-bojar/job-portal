import React from 'react';
import { connect } from 'react-redux';

import { filterAds } from '../../redux/ads/ads.actions';

import './search.styles.scss';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
    };
  }

  handleChange = e => {
    const { value } = e.target;
    const { filterAds } = this.props;
    this.setState({ searchInput: value }, () =>
      filterAds(this.state.searchInput)
    );
  };

  render() {
    return (
      <div className="search">
        <input
          className="search-input"
          value={this.state.searchInput}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  filterAds: filter => dispatch(filterAds(filter)),
});

export default connect(null, mapDispatchToProps)(Search);
