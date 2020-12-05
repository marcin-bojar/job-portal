import React from 'react';

import './custom-select.styles.scss';

const CustomSelect = ({ field, optionsMap, ...props }) => {
  if (!optionsMap) {
    throw new Error('CustomSelect component requires optionMap prop');
  }

  return (
    <select className="custom-select" {...field} {...props}>
      <option className="custom-select__option" value={null}></option>

      {Object.keys(optionsMap).map(key => {
        const option = optionsMap[key];
        return (
          <option key={key} className="custom-select__option" value={key}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

export default CustomSelect;
