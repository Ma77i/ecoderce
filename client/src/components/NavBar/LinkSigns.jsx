import { Button } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

export const LinkSignIn = ({ sign, handleCloseNavMenu }) => {
  return (
    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/sign/login`}>
      <Button
        color="error"
        onClick={handleCloseNavMenu}
        sx={{
          marginLeft: "1rem",
          display: "block"
        }}
      >
        sign in
      </Button>
    </Link>
  );
};

export const LinkSignUp = ({ sign, handleCloseNavMenu }) => {
  return (
    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/sign/register`}>
      <Button
        color="error"
        onClick={handleCloseNavMenu}
        sx={{
          display: "block"
        }}
      >
        sign up
      </Button>
    </Link>
  );
};
