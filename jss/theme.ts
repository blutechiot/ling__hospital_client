import { ThemeProvider } from '@material-ui/core';
import createMuiTheme, {
  ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';

// Override Mui's theme typings to include the new theme property
declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: {
      danger: React.CSSProperties['color'],
    },
    colors?: {
      bgColor1?: React.CSSProperties['color']
    },
  }
  interface ThemeOptions {
    status?: {
      danger?: React.CSSProperties['color']
    },
    colors?: {
      bgColor1?: React.CSSProperties['color']
    },
  }
}


// Extend Material UI theme with custom brand styles
function createMyTheme(options: ThemeOptions) {
  return createMuiTheme({
    status: {
      danger: 'orange',
    },
    colors: {
      bgColor1: '#0B1A27',
    },
    ...options,
  });
}

// Material UI theme options
const theme = createMyTheme({
  palette: {
    primary: {
      main: '#08B1A8',
      contrastText: "#fff",
    },
    secondary: {
      main: '#CBCAF8',
      light: '#CBCAF8',
    },
    error: {
      main: '#FF3D3D',
      light: '#FFD4DA',
    },
    grey: {
      50: '#F2F2F2',
      300: '#929292',
      800: '#131313',
      A100: 'rgba(185, 185, 185, 0.6)',
    },
    background: {
      default: '#FFFFFF',
    },
  },
  typography: {
    h1: {
      fontFamily: "'Noto Sans TC', 'Roboto', 'sans-serif'",
      textTransform: 'unset',
      fontStyle: 'normal',
      fontWeight: 200,
      lineHeight: '110%',
      letterSpacing: '0.05em',
      color: 'white',
      fontSize: 20,
    },
    h2: {
      fontFamily: "'Noto Sans TC', 'Roboto', 'sans-serif'",
      textTransform: 'unset',
      fontStyle: 'normal',
      fontWeight: 300,
      lineHeight: '125%',
      letterSpacing: '0.064em',
      color: 'white',
      fontSize: 16,
    },
    h3: {
      fontFamily: "'Noto Sans TC', 'Roboto', 'sans-serif'",
      fontStyle: 'normal',
      fontWeight: 300,
      lineHeight: '130%',
      letterSpacing: '0.05em',
      color: 'white',
      fontSize: 16.5,
      textTransform: 'unset',
    },
    h4: {
      fontFamily: "'Noto Sans TC', 'Roboto', 'sans-serif'",
      fontWeight: 100,
      fontSize: 15,
      letterSpacing: '0.072em',
      textTransform: 'unset',
      color: 'white',
    },
    h5: {
      fontFamily: "'Noto Sans TC', 'Roboto', 'sans-serif'",
      fontStyle: 'normal',
      fontSize: '14.5px',
      lineHeight: '110%',
      fontWeight: 300,
      letterSpacing: '0.07em',
    },
    h6: {
      fontFamily: "'Noto Sans TC', 'Roboto', 'sans-serif'",
      textTransform: 'unset',
      fontWeight: 100,
      fontSize: 13.5,
      letterSpacing: '0.07em',
    },
    body1: {
      fontFamily: "'Noto Sans TC', 'Roboto', 'sans-serif'",
      fontStyle: 'normal',
      lineHeight: '24px',
      color: 'white',
      fontWeight: 100,
      fontSize: 14.5,
      letterSpacing: '0.072em',
    },
    button: {
      textTransform: 'none',
      color: 'white',
    },
  },
  shape: {
    borderRadius: 2,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
