import React from 'react';
import { Link } from 'react-router-dom';

import SalaryAmount from '../salary-amount/salary-amount-component';

import { formatDate } from '../../redux/ads/ads.utils';

import './search-results-list-item.styles.scss';

const SearchResultsListItem = ({
  category,
  title,
  highlights,
  salary,
  addedAt,
  id,
}) => {
  const { region, system, license } = highlights;
  return (
    <Link
      to={`/ads/${id}`}
      className={`search-results-list-item search-results-list-item--${category}`}
    >
      <div className="search-results-list-item__header">
        <h3 className="search-results-list-item__title">{title}</h3>
        <div className="search-results-list-item__block search-results-list-item__block--column">
          <div className="search-results-list-item__salary">
            <SalaryAmount salary={salary} notProvidedText={null} />
          </div>
          <p className="search-results-list-item__added">
            {formatDate(addedAt.seconds)}
          </p>
        </div>
      </div>
      <div className="search-results-list-item__data">
        {category === 'driver' ? (
          <p className="search-results-list-item__license">
            Prawo jazdy: {license}
          </p>
        ) : null}
        <p className="search-results-list-item__system">
          System pracy: {system}
        </p>
        <p className="search-results-list-item__region">
          {category === 'driver'
            ? 'Zasięg usług transportowych: '
            : 'Miejsce pracy: '}{' '}
          {region.toUpperCase()}
        </p>
      </div>
    </Link>
  );
};

export default SearchResultsListItem;
