import * as React from "react";
import { useState, useEffect } from "react";
// import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";



const Item = ({ item, cartId }) => {


  
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={item.thumbnail}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" >
          Add to Cart
        </Button>
        <Button size="small">
          <Link to={`/products/${item._id}`}>View</Link>
        </Button>
      </CardActions>
    </Card>
  );
};
export default Item;
