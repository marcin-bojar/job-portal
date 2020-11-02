import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  const { value, width } = otherProps;

  return (
    <div className="form-group">
      <input
        className="form-input"
        onChange={handleChange}
        {...otherProps}
        style={{ width: `${width}%` }}
      />
      {label ? (
        <label
          className={`${value.length > 0 ? 'shrink' : ''} form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInput;
