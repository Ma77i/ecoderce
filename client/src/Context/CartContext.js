import { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from 'axios';

const API_CART = 'http://localhost:8080/api/cart';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
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

  console.log("cartFromContext: ", cart);
  // cart.map((item) => console.log(item.products));



  const values = {
    cart: cart,
    setCart: setCart,
    total: total,
    setTotal: setTotal,
    isLoading: isLoading
  }

  return (
    <CartContext.Provider value={{ values }}>
      {children}
    </CartContext.Provider>
  );
}