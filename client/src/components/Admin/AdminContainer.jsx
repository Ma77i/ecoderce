import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));


const lightTheme = createTheme({ palette: { mode: 'light' } });
const pages = ["Users", "Orders", "Products"];

const AdminContainer = () => {
  // const { user } = React.useContext(AuthContext);

  return (
    <Grid container spacing={1}>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={60} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 6,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 3,
              }}
            >
              {pages.map((page) => (
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/admin/${page.toLowerCase()}`}
                      >
                <Item key={page} page={page}>
                      {`${page}`} 
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
