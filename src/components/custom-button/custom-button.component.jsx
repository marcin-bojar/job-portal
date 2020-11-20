import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  handleClick,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${isGoogleSignIn ? 'google' : ''} ${
      inverted ? 'inverted' : ''
    } custom-button`}
    onClick={handleClick}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
