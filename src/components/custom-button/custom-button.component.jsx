import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  handleClick,
  ...otherProps
}) => (
  <button
    className={`${isGoogleSignIn ? 'google' : ''} custom-button`}
    onClick={handleClick}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
