import { useState, useEffect, createContext, useContext } from "react";
// import { AuthContext } from "./AuthContext";
import axios from 'axios';

const API_CART = 'http://localhost:8080/api/cart';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // const [ cart, setCart ] = useState([]);
  // setCart({
  //   productos: [{
  //     id: 1,
  //     title: 'Producto 1',
  //     price: 100,
  //   }],
  // })

  // const values = {
  //   cart
  // }
  
  // const { user } = useContext(AuthContext);
  const uId = "62cf1db532cb8b022baa5a48"
  const userId = localStorage.getItem('user')
  console.log(userId)

  const [cart, setCart] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    axios.get(API_CART)
    .then((res) => {
      const resp = res.data;
      setCart(resp);
      // const cart = resp.filter((item) => item.user === uId);
      // setCart(cart);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log("Error getting cart data", err);
    })
  }, []);

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