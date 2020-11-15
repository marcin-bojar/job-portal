import React from 'react';

import Icon from '../icons/icon-index.component.js';

import './search-filter.styles.scss';

const SearchFilter = ({ category, handleChange, label, icon, disabled }) => (
  <div className="search-filter">
    <label className="search-filter__label">
      {label ? label : null}
      <input
        disabled={disabled}
        className="search-filter__input"
        type="checkbox"
        value={category}
        onChange={handleChange}
      ></input>
      {icon ? <Icon name={icon} /> : null}
    </label>
  </div>
);

export default SearchFilter;
