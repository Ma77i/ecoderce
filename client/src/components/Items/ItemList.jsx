import React from "react";
import Item from "./Item";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ItemList = ({ items }) => {
  if (!items) {
    return (
      <Typography variant="h1" align="center">
        No items to display 
      </Typography>
    )
  }
  
  return (
    <>
      <Grid container spacing={1} direction="row" justify="center" alignItems="center">
        {items.map((item, index) => (
          <Grid key={index}item xs={12} md={3}>
            <Item key={item._id} item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ItemList;
