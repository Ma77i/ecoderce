import * as React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
// import { CartContext } from "../../Context/CartContext";
import Loader from "../utils/Loader";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const API_CART = "http://localhost:8080/api/cart";
// const CURRENT_CART = "http://localhost:8080/api/cart/currentCart";

const Cart = () => {
  //  const { cart } = useContext(CartContext);

  const { user, auth } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API_CART}/currentCart/${user._id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then((res) => {
        setCart(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error getting cart data", err);
      });
  }, [user, auth]);

  // const handleRemoveFromCar = () => {
  //   console.log("removing from cart");
  // }

  const handleRemoveFromCart = (itemId) => {
    console.log(`${API_CART}/${cart.cartId}/products/${itemId}`);
    axios
      .delete(`${API_CART}/${cart.cartId}/products/${itemId}`)
      .then((res) => {
        console.log("Product removed from cart", res);
        // const removeState = cart.products.filter(i=>i._id !== itemId)
        setCart(res.data);
        console.log("cart", cart);
      })
      .catch((err) => {
        console.log("Error removing product from cart", err);
      });
  };

  const handleEmptyCart = () => {
    axios
      .get(`${API_CART}/emptyCart/${cart.cartId}`)
      .then((res) => {
        console.log("Cart emptied", res);
        setCart(res.data);
      })
      .catch((err) => {
        console.log("Error emptying cart", err);
      });
  };

  // React.useEffect(handleEmptyCart, [cart]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading) {
    return (
      <TableContainer component={Paper} m={2}>
        <Typography variant="h1" component="div" align="center" gutterBottom>
          CART
        </Typography>
        {cart.products.length === 0 ? (
          <Typography variant="h2" component="div" align="center" gutterBottom>
            Your cart is empty, please add items to your cart.
          </Typography>
        ) : (
          <>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">Cantity</StyledTableCell>
                  <StyledTableCell align="right">Remove</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.products.map((i) => (
                  <StyledTableRow key={i._id}>
                    <StyledTableCell component="th" scope="row">
                      <img src={i.thumbnail} alt={i.title} height="40" />
                    </StyledTableCell>
                    <StyledTableCell align="right">{i.title}</StyledTableCell>
                    <StyledTableCell align="right">$ {i.price}</StyledTableCell>
                    <StyledTableCell align="right">{i.quantity}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        align="right"
                        onClick={() => handleRemoveFromCart(i._id)}
                      >
                        Rem
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <Typography variant="h4" component="div" align="right" gutterBottom>
              Total: $ {cart.total}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              align="right"
              m={2}
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button variant="contained" color="success" align="right" m={2}>
              <Link style={{ textDecoration: "none", color: "white" }} to="/order">
                Checkout
              </Link>
            </Button>
          </>
        )}
      </TableContainer>
    );
  }
};

export default Cart;
