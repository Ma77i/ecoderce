import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Typography from "@mui/material/Typography";
import ItemList from "../Items/ItemList";
import Loader from "../utils/Loader";
import API from '../utils/api';


const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useContext(AuthContext);

  // API
  useEffect(() => {
    setIsLoading(true)
    API.get(`/api/products`)
      .then(({data}) => {
          console.log(data.message);
          setItems(data.products);
          setIsLoading(false)
        }
      )
    }, []);


  if (isLoading) {
    return <Loader />
  }

  if (!isLoading) {
    return (
      <>
        <Typography variant="h1" component="div" align="center" 
        sx={{
          fontFamily: "Helvetica Neue, sans-serif",
          fontSize: "4rem",
          fontWeight: "bold",
          letterSpacing: "0.3rem",
          color: "#0d1b2a",
          padding: "1rem",
          margin: "0"
        }}
         gutterBottom>
          ¡Welcome {user.userName}!
        </Typography>
        <ItemList items={items} isLoading={isLoading}/>
      </>
    );
    // return <ItemList items={items} isLoading={isLoading} />
  }
};

export default ItemListContainer;
