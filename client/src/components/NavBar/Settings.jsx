import { MenuItem, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const Settings = ({ setting, handleCloseUserMenu }) => {
  return (
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      to={`/${setting.toLowerCase()}`}
    >
      <MenuItem key={setting} onClick={handleCloseUserMenu}>
        <Typography textAlign="center">{setting}</Typography>
      </MenuItem>
    </Link>
  );
};

export default Settings