import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#213E3B"
    },
    secondary: {
      main: "#41AEA9"
    },
    error: {
      main: "#A6F6F1"
    },
    warning: {
      main: "#E8FFFF"
    }
  },
  typography: {
    fontFamily: "Montserrat",

    h1: {}
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        }
      }
    }
  }
});
