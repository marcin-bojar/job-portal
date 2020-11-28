import React from 'react';

import './form-error.styles.scss';

const FormError = ({ children }) => (
  <div className="form-error">
    <p className="form-error__msg">{children}</p>
  </div>
);

export default FormError;
