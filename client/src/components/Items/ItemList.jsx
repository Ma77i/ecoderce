import React from "react";
import Item from "./Item";
import Grid from "@mui/material/Grid";

const ItemList = ({ items }) => {
  if (!items) {
    return <div>No items found</div>;
  }
  
  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        {items.map((item) => (
          <Grid item xs={3}>
            <Item key={item._id} item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ItemList;
