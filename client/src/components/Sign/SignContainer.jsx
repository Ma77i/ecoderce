import * as React from "react";
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import Copyright from "../utils/Copyright"

const theme = createTheme({
  palette: {
    primary: {
      main: "#778da9"
    },
    secondary: {
      main: "#415a77",
      dark: "#1b263b"
    }
  }
});

const SignContainer = () => {

  const param = useParams()
  console.log(param.sign);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        { param.sign === "login" && (<SignIn />)}
        { param.sign === "register" && <SignUp />}
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};

export default SignContainer;
