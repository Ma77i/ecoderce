import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { Button } from '@mui/material';
const API_PRODUCTS = "http://localhost:8080/api/products";
const DELETE_PRODUCT = "http://localhost:8080/api/products/";


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ProductAdmin = () => {
  const [items, setItems] = React.useState([]);
  
  // API
  React.useEffect(() => {
    axios.get(`${API_PRODUCTS}`)
      .then(({data}) => {
          setItems(data);
        }
      )
    }, []);

  const handleDelete = (id) => {
    axios.delete(`${DELETE_PRODUCT}${id}`)
      .then(({data}) => {
          setItems(data);
        }
      )
  }
  
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" align="center" gutterBottom>
            Products
          </Typography>
          <Demo>
            <List>
              {items.map((i)=> (
                <ListItem key={i._id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(i._id)} >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt={i.title} src={i.thumbnail} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={i.title}
                    secondary={i.description}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
        <Button variant="contained" color="success">
          <Link 
            style={{ textDecoration: 'none', color: 'white' }}
            to="/admin/products/add">Add Product</Link>
        </Button>
      </Grid>

    </Box>
  );
}

export default ProductAdmin;