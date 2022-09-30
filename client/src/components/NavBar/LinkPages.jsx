import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LinkPages = ({ page, handleCloseNavMenu }) => {

  return (
    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/${page}`}>
      <Button color="error" onClick={handleCloseNavMenu} sx={{ my: 2, display: "block" }}>
        {page}
      </Button>
    </Link>
  );
};

export default LinkPages