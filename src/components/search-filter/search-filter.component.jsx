import React from 'react';

import './search-filter.styles.scss';

const SearchFilter = ({ category, handleChange, label }) => (
  <div className="search-filter">
    <label className="search-filter__label">
      {label}
      <input
        className="search-filter__input"
        type="checkbox"
        name={category}
        onChange={handleChange}
      ></input>
    </label>
  </div>
);

export default SearchFilter;
