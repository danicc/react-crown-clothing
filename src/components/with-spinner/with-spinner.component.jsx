import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

function WithSpinner(WrappedComponent) {
  function Spinner({ isLoading, ...otherProps }) {
    if (isLoading) {
      return (
        <SpinnerOverlay>
          <SpinnerContainer />
        </SpinnerOverlay>
      );
    }
    return <WrappedComponent {...otherProps} />;
  }
  return Spinner;
}

export default WithSpinner;
