import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  handleClick,
  inverted,
  secondary,
  ...otherProps
}) => (
  <button
    className={`${isGoogleSignIn ? 'google' : ''} 
    ${inverted ? 'inverted' : ''}
    ${secondary ? 'secondary' : ''} custom-button`}
    onClick={handleClick}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
