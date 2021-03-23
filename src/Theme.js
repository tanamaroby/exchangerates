import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
        main: '#ffffff',
        dark: '#e5e5e5',
        black: '#000000'
    },
    background: {
        main: '#14213d',
        alternate: '#FCA311'
    }
  },
}));

export default theme;
