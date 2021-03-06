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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
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


const Cart = () => {
  //  const { cart } = useContext(CartContext);

  const { user, auth } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/cart/currentCart/${user._id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then(({ data }) => {
        console.log(data.message);
        setCart(data.cart);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error getting cart data", err);
      });
  }, [user, auth]);

  const handleRemoveFromCart = (itemId) => {
    axios
      .delete(`/api/cart/${cart._id}/products/${itemId}`)
      .then(({ data }) => {
        console.log(data.message);
        setCart(data.cart);
      })
      .catch((err) => {
        console.log("Error removing product from cart", err);
      });
  };

  const handleEmptyCart = () => {
    axios
      .get(`/api/cart/emptyCart/${cart._id}`)
      .then(({ data }) => {
        console.log(data.message);
        setCart(data.cart);
      })
      .catch((err) => {
        console.log("Error emptying cart", err);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading) {
    return (
      <TableContainer component="div" m={5} align="center">
        <Typography variant="h1" component="div" align="center" gutterBottom>
          CART
        </Typography>
        {cart.products.length === 0 ? (
          <Typography variant="h2" component="div" align="center" gutterBottom>
            Your cart is empty, please add items to your cart.
          </Typography>
        ) : (
          <>
            <Table sx={{ maxWidth: 1000, m: 1, align: 'center' }} aria-label="customized-table">
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
                      <IconButton
                        edge="center"
                        aria-label="delete"
                        onClick={() => handleRemoveFromCart(i._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <TableRow align="right">
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">$ {cart.products.length > 0
                    ? cart.products.reduce((tot, p) => tot + p.price * p.quantity, 0)
                    : 0}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
