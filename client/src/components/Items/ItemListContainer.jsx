import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ItemList from "./ItemList";
import Loader from "../utils/Loader";
import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { userCredentials } = useContext(AuthContext);

  // API
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${API_URL}`)
      .then(({data}) => {
          setItems(data);
          setIsLoading(false)
        }
      )
    }, []);
  console.log("items", items)

  if (isLoading) {
    return <Loader />
  }

  if (!isLoading) {
    return (
      <>
        <h2>Bienvenido {userCredentials.email}</h2>
        <ItemList items={items} isLoading={isLoading}/>
      </>
    );
    // return <ItemList items={items} isLoading={isLoading} />
  }
};

export default ItemListContainer;
