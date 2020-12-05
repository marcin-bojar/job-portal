import React, { useState } from 'react';

import Icon from '../icons/icon-index.component';

import './dropdown.styles.scss';

const Dropdown = ({ items, children }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown__label" onClick={() => setIsShown(!isShown)}>
        {children}
        <div className="dropdown__arrow">
          <Icon name={isShown ? 'arrow-up' : 'arrow-down'} width="2rem" />
        </div>
      </div>
      {isShown && (
        <div className="dropdown__items">
          <ul className="dropdown__items-list">
            {items.map((item, i) => (
              <li key={i} className="dropdown__item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
