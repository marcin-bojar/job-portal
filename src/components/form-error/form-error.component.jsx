import React from 'react';

import './form-error.styles.scss';

const FormError = ({
  children,
  shortInput,
  selectInput,
  textareaInput,
  dropdownInput,
}) => (
  <div
    className={`
    ${shortInput ? 'short-input' : ''} 
    ${selectInput ? 'select-input' : ''}
    ${dropdownInput ? 'dropdown-input' : ''}
    ${textareaInput ? 'textarea-input' : ''} form-error`}
  >
    <p className="form-error__msg">{children}</p>
  </div>
);

export default FormError;
