import { ThemeProvider } from 'styled-components';

import { myTheme } from "../theme/default";
import GlobalStyles from './globals';

const Theme = ({ children }) => (
  <ThemeProvider theme={myTheme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default Theme;