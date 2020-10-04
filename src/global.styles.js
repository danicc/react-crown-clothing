import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
    }
    
  body {
    margin: 0;
    font-family: 'Open Sans Condensed', sans-serif;
    padding: 16px 80px;
    @media screen and (max-width: 800px){
        padding: 10px
      }
  }
  
  a {
    text-decoration: none;
    color: black;
  }
`;
