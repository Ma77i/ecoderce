import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import Loader from "../utils/Loader";


const ItemDetailContainer = () => {

  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const param = useParams();

  // API
  useEffect(() => {
    setIsLoading(true)

      axios
        .get(`/api/products/${param.id}`)
        .then(({data}) => {
          console.log(data.message);
          setItem(data.product);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [param.id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading) {
    return <ItemDetail item={item} isLoading={isLoading}/>;
  }
};

export default ItemDetailContainer;
