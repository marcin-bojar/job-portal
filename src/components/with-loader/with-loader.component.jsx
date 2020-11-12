import React from 'react';

import { ReactComponent as Spinner } from './bars.svg';

import './with-loader.styles.scss';

const withLoader = WrappedComponent => ({ isLoading, otherProps }) => {
  return isLoading ? (
    <div className="with-loader">
      <Spinner />
    </div>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default withLoader;
