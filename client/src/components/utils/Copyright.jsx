import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";


const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }} >
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/mattias-silva">
        Matias Silva
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright