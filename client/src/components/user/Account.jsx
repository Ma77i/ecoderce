import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import { Link } from "react-router-dom";

import { AuthContext } from "../../Context/AuthContext";

const Account = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: 10
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" alt={user.userName} height="140" image={user.avatar} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.phone}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};
export default Account;
