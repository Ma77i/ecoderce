import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
const API_CART = 'http://localhost:8080/api/cart';
const CURRENT_CART = 'http://localhost:8080/api/cart/currentCart';

const ItemDetail = ({ item }) => {
  const { user, auth } = React.useContext(AuthContext);
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${CURRENT_CART}/${user._id}`,
    {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then(({data}) => {
      console.log(data.message);
      setCart(data);
    });
  }, [user._id, auth.token]);

  const handleAddToCart = () => {
    axios.post(`${API_CART}/${cart.cartId}/products/${item._id}`)
      .then(({data}) => {
        console.log(data.message);
      })
      .catch((err) => {
        console.log("Error adding product to cart", err);
      })
  }

  return (

      <Card sx={{ maxWidth: 345 }} >
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
            $ {item.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
  );
};
export default ItemDetail;
