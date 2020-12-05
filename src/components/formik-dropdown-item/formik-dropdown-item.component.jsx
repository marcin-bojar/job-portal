import React from 'react';
import { Field } from 'formik';

import './formik-dropdown-item.styles.scss';

const FormikDropdownItem = ({ name, label }) => (
  <div className="formik-dropdown-item">
    <Field name={name} type="checkbox" id={label} value={label} />
    <label htmlFor={label}>{label}</label>
  </div>
);

export default FormikDropdownItem;
