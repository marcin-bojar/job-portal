import React from 'react';

import './custom-textarea.styles.scss';

const CustomTextarea = ({ field, ...props }) => (
  <div className="custom-textarea">
    <textarea className="custom-textarea__input" {...field} {...props} />
  </div>
);

export default CustomTextarea;
