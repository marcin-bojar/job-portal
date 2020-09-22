import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  const { value } = otherProps;

  return (
    <div className="form-group">
      {label ? (
        <label
          className={`${value.length > 0 ? 'shrink' : ''} form-input-label`}
        >
          {label}
        </label>
      ) : null}
      <input className="form-input" onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormInput;
