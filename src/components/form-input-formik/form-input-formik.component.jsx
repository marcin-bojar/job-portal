import React from 'react';

import './form-input-formik.styles.scss';

const FormInputFormik = ({
  field,
  label,
  error,
  width,
  handleKeyPress,
  ...props
}) => {
  const value = field ? field.value : props.value;

  return (
    <div
      className={`${error ? 'error' : ''} form-input`}
      style={{ width: `${width}%` }}
    >
      <input
        className="form-input__input"
        onKeyDown={handleKeyPress}
        {...field}
        {...props}
      />
      {label ? (
        <label
          className={`${value.length > 0 ? 'shrink' : ''} form-input__label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default FormInputFormik;
