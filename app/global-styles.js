import { createGlobalStyle } from 'styled-components';
import Roboto from 'typeface-roboto/index.css';

const GlobalStyle = createGlobalStyle`
  ${Roboto}
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family:  Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: Roboto, 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Roboto, Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
