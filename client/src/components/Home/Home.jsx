import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../Context/AuthContext";

const Home = () => {
  const { auth } = React.useContext(AuthContext);

  return (
    <>
      <Typography variant="h1" component="div" align="center" gutterBottom>
        ECODERCE
      </Typography>
        {
        !auth &&
        <Typography variant="h3" component="div" align="center" gutterBottom>
          <Link style={{ textDecoration: "none", }} color="success" to="/login">Sign In</Link>
          <br />
          <Link style={{ textDecoration: "none" }} color="secondary" to="/register">Sign Up</Link>
        </Typography>

        }
    </>
  );
};

export default Home;
