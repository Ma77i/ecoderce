import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Swal from "sweetalert2";
import API from "../../utilities/api";
import { useDispatch, useSelector } from "react-redux";
import { modifyCart } from "../../redux/states/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

const ItemDetail = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(cartState);

  useEffect(() => {
    if (authState) {
      setIsLoading(true);
      API.get(`/api/cart/currentCart/${userState._id}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      }).then(({ data }) => {
        console.log(data.message);
        dispatch(modifyCart(data));
        setCart(data);
        setIsLoading(false);
      });
    }
  }, [userState._id, authState, dispatch]);

  const handleAddToCart = () => {
    if (!authState) navigate("/sign/login");

    if (authState) {
      API.post(`/api/cart/${cart.cartId}/products/${item._id}`)
        .then(({ data }) => {
          console.log(data.message);
        })
        .catch((err) => {
          console.log("Error adding product to cart", err);
        });
      Swal.fire({
        icon: "success",
        text: "Product added to Cart",
        footer: '<Link to="/cart">Go to Cart</Link>'
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        margin: 10,
        border: "5px solid black",
        borderRadius: "20px"
      }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // maxWidth: 345,
          margin: 10,
          borderRadius: "15px"
        }}
      >
        <CardMedia
          component="img"
          alt="product-image"
          image={item.thumbnail}
          sx={{
            width: { xl: "50%" },
            padding: 10
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "50%"
          }}
        >
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            {item.title}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            $ {item.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            $ {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAddToCart}
            endIcon={<AddShoppingCartIcon />}
          >
            Add to Cart
          </Button>
        </CardActions>
        </Box>
      </Card>
    </Box>
  );
};
export default ItemDetail;
