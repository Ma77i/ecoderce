import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


const Account = () => {
  const userState = useSelector(state=>state.user)

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
        <CardMedia component="img" alt={userState.userName} height="140" image={userState.avatar} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {userState.firstName} {userState.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userState.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userState.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userState.phone}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};
export default Account;
