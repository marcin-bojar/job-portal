import React from 'react';

import './form-input-formik.styles.scss';

const FormInputFormik = ({ field, label, ...props }) => {
  const { value } = field;
  return (
    <div className="form-group">
      <input className="form-input" {...field} {...props} />
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

export default FormInputFormik;
