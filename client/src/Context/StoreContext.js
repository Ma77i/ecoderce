import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_STORE = "http://localhost:8080/store";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);

    useEffect(() => {
        axios.get(API_STORE).then(res => {
            console.log("RES: ", res);
            console.log("RESDATA: ", res.data);
            setUser(res.data.user);
        });
    }, [])

    const consumeContext = {
        user,
        setUser,
        cart,
        setCart,
        products,
        setProducts,
    };
    
    return (
        <StoreContext.Provider value={consumeContext}>
            {children}
        </StoreContext.Provider>
    );
};

