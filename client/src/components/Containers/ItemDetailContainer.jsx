import React from "react";
import API from '../../utilities/api';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../Items/ItemDetail";


const ItemDetailContainer = () => {

  const [item, setItem] = useState({});
  const param = useParams();

  // API
  useEffect(() => {

      API
        .get(`/api/products/${param.id}`)
        .then(({data}) => {
          console.log(data.message);
          setItem(data.product);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [param.id]);

    return <ItemDetail item={item} />;
};

export default ItemDetailContainer;
