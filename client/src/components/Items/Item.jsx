import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <Box m={5}>
      <Card sx={{ maxWidth: 345, borderRadius: "15px", mx: "auto" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image={item.thumbnail}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
            to={`/store/${item._id}`}
          >
            <Button size="large" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} color="error">
              View
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
};
export default Item;
