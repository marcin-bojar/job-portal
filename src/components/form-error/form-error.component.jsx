import React from 'react';

import './form-error.styles.scss';

const FormError = ({ children, shortInput, selectInput, textareaInput }) => (
  <div
    className={`
    ${shortInput ? 'short-input' : ''} 
    ${selectInput ? 'select-input' : ''}
    ${textareaInput ? 'textarea-input' : ''} form-error`}
  >
    <p className="form-error__msg">{children}</p>
  </div>
);

export default FormError;
