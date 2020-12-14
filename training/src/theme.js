import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Comic Sans MS',
      'cursive',
      'sans-serif',
    ].join(','),
    htmlfontSize: 100,
  },
});

export default theme;
