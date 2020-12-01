import React from 'react';

import './custom-textarea.styles.scss';

const CustomTextarea = props => (
  <div className="custom-textarea">
    <textarea className="custom-textarea__input" {...props} />
  </div>
);

export default CustomTextarea;
