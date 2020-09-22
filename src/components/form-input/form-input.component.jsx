import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  const { value } = otherProps;

  return (
    <div className="form-group">
      <input className="form-input" onChange={handleChange} {...otherProps} />
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
