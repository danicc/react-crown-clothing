import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

function CustomButton({ children, inverted, isGoogleSignIn, ...otherProps }) {
  return (
    <CustomButtonContainer
      isGoogleSignIn={isGoogleSignIn}
      inverted={inverted}
      {...otherProps}
    >
      {children}
    </CustomButtonContainer>
  );
}

export default CustomButton;
