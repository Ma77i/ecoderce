import { useState, useEffect, createContext } from "react";
import API from "../utils/api"
import { useSelector } from "react-redux";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const userState = useSelector(state=>state.user)
  const authState = useSelector(state=>state.auth)

  const [cart, setCart] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    API.get(`/api/cart/currentCart/${userState._id}`, {
      headers: {
        Authorization: `Bearer ${authState.token}`
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
  }, [userState, authState]);

    const handleRemoveFromCart = (itemId) => {
      API.delete(`/api/cart/${cart._id}/products/${itemId}`)
        .then(({ data }) => {
          console.log(data.message);
          setCart(data.cart);
        })
        .catch((err) => {
          console.log("Error removing product from cart", err);
        });
    };

    const handleEmptyCart = () => {
      API.get(`/api/cart/emptyCart/${cart._id}`)
        .then(({ data }) => {
          console.log(data.message);
          setCart(data.cart);
        })
        .catch((err) => {
          console.log("Error emptying cart", err);
        });
    };

  const values = {
    cart: cart,
    setCart: setCart,
    total: total,
    setTotal: setTotal,
    isLoading: isLoading,
    handleEmptyCart: handleEmptyCart,
    handleRemoveFromCart: handleRemoveFromCart
  }

  return (
    <CartContext.Provider value={{ values }}>
      {children}
    </CartContext.Provider>
  );
}