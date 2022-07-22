import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 100,
  lineHeight: "60px",
  fontSize: "1.5rem",

}));

const lightTheme = createTheme({ palette: { mode: "light" } });
const pages = ["Users", "Orders", "Products"];

const AdminContainer = () => {
  // const { user } = React.useContext(AuthContext);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      {[lightTheme].map((theme, index) => (
        <Grid item xs={12} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 6,
                bgcolor: "background.default",
                display: "grid",
                gap: 6,
              }}
            >
              {pages.map((page) => (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/admin/${page.toLowerCase()}`}
                >
                  <Item key={page} page={page}>
                  <Badge badgeContent={4} color="primary">
                    {`${page}`}
                  </Badge>
                  </Item>
                </Link>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminContainer;
