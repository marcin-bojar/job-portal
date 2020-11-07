import React from 'react';

import './form-input.styles.scss';

const FormInput = ({
  handleChange,
  handleKeyPress,
  label,
  disabled,
  ...otherProps
}) => {
  const { value, width } = otherProps;

  return (
    <div className="form-group">
      <input
        className="form-input"
        onChange={handleChange}
        {...otherProps}
        style={{ width: `${width}%` }}
        disabled={disabled}
        onKeyDown={handleKeyPress}
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
