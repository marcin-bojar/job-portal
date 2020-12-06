import React from 'react';
import { Field } from 'formik';

import './formik-dropdown-item.styles.scss';

const FormikDropdownItem = ({ name, label }) => (
  <div className="formik-dropdown-item">
    <label className="formik-dropdown-item__label" htmlFor={label}>
      {label}
    </label>
    <Field
      className="formik-dropdown-item__field"
      name={name}
      type="checkbox"
      id={label}
      value={label}
      tabIndex="-1"
    />
  </div>
);

export default FormikDropdownItem;
