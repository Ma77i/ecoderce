import * as React from "react";
// import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
// import { CartContext } from "../../Context/CartContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
// const API_CART = 'http://localhost:8080/api/cart';

const Item = ({ item }) => {

  const { user } = useContext(AuthContext);
  // const { addToCart } = useContext(CartContext);

  // const handleAddToCart = (userId, productId) => {
  //   axios.post(`${API_CART}/${userId}/products/${productId}`)
  //     .then((res) => {
  //       console.log("Product added to cart", res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error adding product to cart", err);
  //     })
  // }

  const handleAddToCart = (cartId, productId) => {
    console.log("add to cart", cartId, productId);
  }


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
        <Button
          size="small"
          onClick={handleAddToCart(user._id, item._id)}
        >
          Add to Cart
          {/* <Link to={`/cart`}> Add to Cart </Link> */}
        </Button>
        <Button size="small">
          <Link to={`/products/${item._id}`}>View</Link>
        </Button>
      </CardActions>
    </Card>
  );
};
export default Item;
