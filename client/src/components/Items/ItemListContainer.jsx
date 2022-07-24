import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Typography from "@mui/material/Typography";
import ItemList from "./ItemList";
import Loader from "../utils/Loader";
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useContext(AuthContext);

  // API
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${API_URL}`)
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
        <Typography sx={{ m: 2 }} variant="h1" component="div" align="center" gutterBottom>
          Welcome {user.userName}
        </Typography>
        <ItemList items={items} isLoading={isLoading}/>
      </>
    );
    // return <ItemList items={items} isLoading={isLoading} />
  }
};

export default ItemListContainer;
