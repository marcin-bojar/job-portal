import React, { useState, useRef, useEffect } from 'react';

import Icon from '../icons/icon-index.component';

import './dropdown.styles.scss';

const Dropdown = ({ items, children }) => {
  const [isShown, setIsShown] = useState(false);
  const [selected, setSelected] = useState(0);
  const itemsRef = useRef([]);

  // Focus on input of newly selected dropdown item if input is present
  useEffect(() => {
    if (itemsRef.current[selected]) {
      const input = itemsRef.current[selected].querySelector('input');
      if (input) input.focus();
    }
  }, [selected]);

  const toggle = () => setIsShown(!isShown);
  const hide = () => setIsShown(false);

  const handleKeyUp = e => {
    // console.log(e.key);
    // console.log(e.keyCode);
    // console.log(e.which);

    if (e.key !== undefined) {
      if (e.key === 'ArrowDown') {
        if (selected < items.length - 1) setSelected(selected + 1);
      }

      if (e.key === 'ArrowUp') {
        if (selected !== 0) setSelected(selected - 1);
      }

      if (e.key === 'Enter') toggle();
      if (e.key === 'Escape') hide();

      // Legacy browsers
    } else if (e.keyCode !== undefined || e.which !== undefined) {
      if (e.keyCode === 40 || e.which === 40) {
        if (selected < items.length - 1) setSelected(selected + 1);
      }

      if (e.keyCode === 38 || e.which === 38) {
        if (selected !== 0) setSelected(selected - 1);
      }

      if (e.keyCode === 13 || e.which === 13) toggle();
      if (e.keyCode === 27 || e.which === 27) hide();
    }
  };

  return (
    <div className="dropdown" tabIndex="0" onKeyUp={handleKeyUp}>
      <div className="dropdown__label" onClick={toggle}>
        {children}
        <div className="dropdown__arrow">
          <Icon name={isShown ? 'arrow-up' : 'arrow-down'} width="2rem" />
        </div>
      </div>
      {isShown && (
        <div className="dropdown__items" tabIndex="0">
          <ul className="dropdown__items-list">
            {items.map((item, i) => (
              <li
                key={i}
                ref={el => (itemsRef.current[i] = el)}
                className={`dropdown__item ${selected === i ? 'active' : ''}`}
                onMouseEnter={() => {
                  setSelected(i);
                  itemsRef.current[i].querySelector('input').focus();
                }}
              >
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
