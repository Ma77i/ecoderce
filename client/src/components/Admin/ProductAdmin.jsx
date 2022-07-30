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

import API from '../utils/api';
import { Button } from '@mui/material';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ProductAdmin = () => {
  const [items, setItems] = React.useState([]);
  
  // API
  React.useEffect(() => {
    API.get(`/api/products`)
      .then(({data}) => {
          console.log(data.message);
          setItems(data.products);
        }
      )
    }, []);

  const handleDelete = (id) => {
    API.delete(`/api/products/${id}`)
      .then(({data}) => {
          console.log(data.message);
          setItems(data.products);
        }
      )
  }
  
  return (
    <Box 
      sx={{ 
        marginTop: 8,
        display: 'flex',
        justifyContent: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '50%',
        margin: 'auto',
        }}>
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
                    tertiary={i.price}
                    fourth={i.stock}

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