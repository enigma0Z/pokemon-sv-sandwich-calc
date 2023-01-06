import createTheme from "@mui/material/styles/createTheme";

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#300000'
    },
    text: {
      primary: "#FFFFFF"
    },
  },
  typography: {
    fontFamily: 'Futura',
    h1: {
      fontWeight: 'bold',
      fontSize: '24pt',
      textAlign: 'center',
    },
    h2: {
      fontWeight: 'bold',
      fontSize: '18pt',
    },
  }
});