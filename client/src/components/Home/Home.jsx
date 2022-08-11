import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { AuthContext } from "../../Context/AuthContext";

const Home = () => {
  const { auth } = React.useContext(AuthContext);

  return (
    <>
      <Typography
        variant="h1"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Helvetica Neue, sans-serif",
          fontSize: {xs: "3rem", md: "8rem"},
          fontWeight: "bold",
          letterSpacing: { xs: "0.2rem", md: "1rem"},
          color: "#0d1b2a",
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
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "60%",
          margin: "0 auto",
          letterSpacing: "0.5rem",
          color: "#252525",
          padding: "1rem"
        }}
        gutterBottom
      >
        Welcome to the best ecommerce site in the world
      </Typography>
      {!auth && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            margin: "1rem",
          }}>
          <Button 
            variant="contained"
            sx={{
              backgroundColor: "#415a77",
              color: "#e0e1dd",
              fontSize: "1.3rem",
              padding: "1rem 4rem",
            }}>
            <Link style={{ textDecoration: "none" , color: "inherit" }} to="/login">
              Sign In
            </Link>
          </Button>
          <Button 
            variant="contained"
            sx={{
              marginLeft: "1rem",
              backgroundColor: "#415a77",
              color: "#e0e1dd",
              fontSize: "1.3rem",
              padding: "1rem 4rem",
            }}
            >
            <Link style={{ textDecoration: "none" , color: "inherit" }} to="/register">
              Sign Up
            </Link>
          </Button>
        </Box>
      )}
    </>
  );
};

export default Home;
