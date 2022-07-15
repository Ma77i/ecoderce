import * as React from "react";
import axios from "axios";
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

const API_CART = 'http://localhost:8080/api/cart';

const CURRENT_CART = 'http://localhost:8080/api/cart/currentCart';

const Item = ({ item }) => {

  const { user, auth } = useContext(AuthContext);

  const [cart, setCart] = React.useState([]);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${CURRENT_CART}/${user._id}`,
    {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    }).then((res) => {
      setCart(res.data);
      setItems(res.data.products);
    });
  }, [user._id, auth.token]);


  // console.log("_CART: ", cart);
  // console.log("_ITEMS: ", items);
  // console.log("_USER: ", user);
  // console.log("_ITEM: ", item);

  const handleAddToCart = (productId) => {
    // axios.post(`${API_CART}/${cartId}/products/${productId}`)
    //   .then((res) => {
    //     console.log("Product added to cart", res.data);
    //   })
    //   .catch((err) => {
    //     console.log("Error adding product to cart", err);
    //   })
    console.log("ITEM: ", item);
    items.push(item); 
  }



  // const handleAddToCart = (cartId, productId) => {
  //   console.log("add to cart", cartId, productId);
  // }


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
          onClick={handleAddToCart(item._id)}
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
