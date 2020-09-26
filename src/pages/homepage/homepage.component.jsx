import React from 'react';

import { HomePageContainer } from './homepage.styles';
import Directory from '../../components/directory/directory.component';

const HomePage = () => (
  <HomePageContainer>
    <h1>Welcome to my Homepage</h1>
    <Directory />
  </HomePageContainer>
);

export default HomePage;
