import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        border: "5px solid black",
        borderRadius: "20px"
      }}
    >
      <Typography
        variant="h1"
        component="div"
        color="primary"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: { xs: "0.2rem", md: "1rem" },
          fontSize: { xs: "3rem", md: "8rem" },
          padding: "1rem",
          margin: "0"
        }}
        gutterBottom
      >
        ECODERCE 404 YOU ARE LOST HERE!
      </Typography>
      <Link style={{ textDecoration: "none", color: "inherit", margin: "10px" }} to="/store">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary",
            color: "info",
            fontSize: "1.3rem",
            padding: "1rem 4rem"
          }}
        >
          GET BACK HOME
        </Button>
      </Link>
    </Box>
  );
}

export default PageNotFound