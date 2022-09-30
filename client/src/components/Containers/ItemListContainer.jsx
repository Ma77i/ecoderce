import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import ItemList from "../Items/ItemList";
import API from "../../utilities/api";
import { useSelector } from "react-redux";
import { selectorUser } from "../../redux/states/user"
import Loader from "../utils/Loader";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userState = useSelector(selectorUser);

  console.log(userState);

  // API
  useEffect(() => {
    setIsLoading(true);
    API.get(`/api/products`).then(({ data }) => {
      console.log(data.message);
      setItems(data.products);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading) {
    return (
      <>
        <Typography
          variant="h1"
          component="div"
          align="center"
          sx={{
            fontSize: { xs: "2rem", md: "4rem" },
            fontWeight: "bold",
            letterSpacing: "0.3rem",
            color: "#0d1b2a",
            padding: "1rem",
            margin: "0"
          }}
          gutterBottom
        >
          ¡Welcome {userState.userName}!
        </Typography>
        <ItemList items={items} />
      </>
    );
  }
};

export default ItemListContainer;
