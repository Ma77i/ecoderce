import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import API from '../../utils/api';
import { useSelector } from "react-redux";

const ItemDetail = ({ item }) => {
  const userState = useSelector((state) => state.user);
  const authState = useSelector((state) => state.auth);
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    API.get(`/api/cart/currentCart/${userState._id}`,
    {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    }).then(({data}) => {
      console.log(data.message);
      setCart(data);
    });
  }, [userState._id, authState.token]);

  const handleAddToCart = () => {
    API.post(`/api/cart/${cart.cartId}/products/${item._id}`)
      .then(({data}) => {
        console.log(data.message);
      })
      .catch((err) => {
        console.log("Error adding product to cart", err);
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
      }}>
      <Card sx={{ maxWidth: 345 }} >
        <CardMedia
          component="img"
          alt="green iguana"
          height="400"
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
    </Box>
  );
};
export default ItemDetail;
