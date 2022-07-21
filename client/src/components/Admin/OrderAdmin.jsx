import * as React from 'react';
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
const API_ORDERS = "http://localhost:8080/api/orders";




// function generate(element) {
//   return [items].map((value) =>
//   React.cloneElement(element, {
//     key: value,
//   }),
//   );
// }

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const OrderAdmin = () => {
  const [orders, setOrders] = React.useState([]);


  
  // API
  React.useEffect(() => {
    axios.get(`${API_ORDERS}`)
      .then(({data}) => {
          console.log(data.message);
          setOrders(data.orders);
      })
      .catch(err => { console.log(err); });
    }, []);


    const handleDelete = (id) => {
      axios.delete(`${API_ORDERS}${id}`)
        .then(({data}) => {
            console.log(data.message);
            setOrders(data.orders);
          }
        ).catch(err => { console.log(err); });
    }

    const sendOrder = (id) => {
      console.log("send", id);
      axios.put(`${API_ORDERS}/${id}`)
        .then(({data}) => {
            console.log(data.message);
            setOrders(data.orders);
          }
        ).catch(err => { console.log(err); });
    }

    console.log(orders)
   
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" align="center" gutterBottom>
            Orders
          </Typography>
          <Demo>
            <List>
              {orders.map((i)=> (
                <ListItem key={i._id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => sendOrder(i._id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${i.created}, Total: $${i.total}`}
                    secondary={`User: ${i.user}, Sent: ${i.send.toString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderAdmin;