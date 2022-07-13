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

const Cart = () => {
//  const { cart } = useContext(CartContext);




  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // setIsLoading(true);
  React.useEffect(() => {
    setIsLoading(true);
    axios.get(API_CART)
    .then((res) => {
      const resp = res.data;
      const cart = resp.filter((item) => item.user === user._id);
      setCart(cart);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log("Error getting cart data", err);
    })
  }, [user._id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading) {
    return (
      <TableContainer component={Paper} m={2}>
        <Typography variant="h1" component="div" align="center" gutterBottom>
          CART
        </Typography>
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
            {cart.map((row) => (
              <StyledTableRow key={row.products._id}>
                <StyledTableCell component="th" scope="row">
                  {row.products.thumbnail}
                </StyledTableCell>
                <StyledTableCell align="right">{row.products.title}</StyledTableCell>
                <StyledTableCell align="right">{row.products.price}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default Cart;
