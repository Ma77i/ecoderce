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
        {
        !auth &&
        <div>
          <Link to="/login">Sign In</Link>
          <br />
          <Link to="/register">Sign Up</Link>
        </div>
        }
      </Typography>
    </>
  );
};

export default Home;
