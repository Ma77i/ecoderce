import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


const Home = () => {
  
  return (
    <>
      <Typography
        variant="h1"
        component="div"
        color="primary"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          letterSpacing: { xs: "0.2rem", md: "1rem" },
          fontSize: { xs: "3rem", md: "8rem" },
          padding: "1rem",
          margin: "0"
        }}
        gutterBottom
      >
        ECODERCE
      </Typography>
      <Typography
        variant="h4"
        component="div"
        align="center"
        color="primary"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "60%",
          margin: "0 auto",
          letterSpacing: "0.5rem",
          padding: "1rem"
        }}
        gutterBottom
      >
        Welcome to the best ecommerce site in the world.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          margin: "1rem"
        }}
      >
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/store">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary",
              color: "info",
              fontSize: "1.3rem",
              padding: "1rem 4rem"
            }}
          >
            STORE
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Home;
