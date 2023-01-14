import createTheme from "@mui/material/styles/createTheme";

declare module '@mui/material/styles' {
  interface Palette {
    black: Palette['primary'];
    salty: Palette['primary'];
    sweet: Palette['primary'];
    bitter: Palette['primary'];
    hot: Palette['primary'];
    sour: Palette['primary'];

    normal: Palette['primary'];
    fighting: Palette['primary'];
    flying: Palette['primary'];
    poison: Palette['primary'];
    ground: Palette['primary'];
    rock: Palette['primary'];
    bug: Palette['primary'];
    ghost: Palette['primary'];
    steel: Palette['primary'];
    fire: Palette['primary'];
    water: Palette['primary'];
    grass: Palette['primary'];
    electric: Palette['primary'];
    psychic: Palette['primary'];
    ice: Palette['primary'];
    dragon: Palette['primary'];
    dark: Palette['primary'];
    fairy: Palette['primary'];
  }

  interface PaletteOptions {
    black: PaletteOptions['primary'];
    salty: PaletteOptions['primary'];
    sweet: PaletteOptions['primary'];
    bitter: PaletteOptions['primary'];
    hot: PaletteOptions['primary'];
    sour: PaletteOptions['primary'];

    normal: PaletteOptions['primary'];
    fighting: PaletteOptions['primary'];
    flying: PaletteOptions['primary'];
    poison: PaletteOptions['primary'];
    ground: PaletteOptions['primary'];
    rock: PaletteOptions['primary'];
    bug: PaletteOptions['primary'];
    ghost: PaletteOptions['primary'];
    steel: PaletteOptions['primary'];
    fire: PaletteOptions['primary'];
    water: PaletteOptions['primary'];
    grass: PaletteOptions['primary'];
    electric: PaletteOptions['primary'];
    psychic: PaletteOptions['primary'];
    ice: PaletteOptions['primary'];
    dragon: PaletteOptions['primary'];
    dark: PaletteOptions['primary'];
    fairy: PaletteOptions['primary'];
  }
}

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
    black: {
      main: '#000000',
      contrastText: '#FFFFFF',
      dark: '#000000',
    },

    // Flavor colors
    salty: {
      main: '#dadacd',
      contrastText: '#000000'
    },
    sweet: {
      main: '#f4a6d2',
      contrastText: '#000000'
    },
    bitter: {
      main: '#afd086',
      contrastText: '#000000'
    },
    hot: {
      main: '#e67325',
      contrastText: '#000000'
    },
    sour: {
      main: '#dbc700',
      contrastText: '#000000'
    },

    // Type colors
    normal: {
      main: '#a8a878',
      contrastText: '#FFF'
    },
    fighting: {
      main: '#c03028',
      contrastText: '#FFF'
    },
    flying: {
      main: '#a890f0',
      contrastText: '#FFF'
    },
    poison: {
      main: '#a040a0',
      contrastText: '#FFF'
    },
    ground: {
      main: '#e0c068',
      contrastText: '#FFF'
    },
    rock: {
      main: '#e0c068',
      contrastText: '#FFF'
    },
    bug: {
      main: '#a8b820',
      contrastText: '#FFF'
    },
    ghost: {
      main: '#705898',
      contrastText: '#FFF'
    },
    steel: {
      main: '#a0a1b7',
      contrastText: '#FFF'
    },
    fire: {
      main: '#f08030',
      contrastText: '#FFF'
    },
    water: {
      main: '#6890f0',
      contrastText: '#FFF'
    },
    grass: {
      main: '#78c850',
      contrastText: '#FFF'
    },
    electric: {
      main: '#f1cc35',
      contrastText: '#FFF'
    },
    psychic: {
      main: '#f85888',
      contrastText: '#FFF'
    },
    ice: {
      main: '#87c4c4',
      contrastText: '#FFF'
    },
    dragon: {
      main: '#7038f8',
      contrastText: '#FFF'
    },
    dark: {
      main: '#705848',
      contrastText: '#FFF'
    },
    fairy: {
      main: '#e093a5',
      contrastText: '#FFF'
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
    h3: {
      fontSize: '18pt',
    },
  }
});