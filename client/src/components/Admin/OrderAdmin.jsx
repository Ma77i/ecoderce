import API from '../../utilities/api';
import { useEffect, useState } from 'react';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from "@mui/material/Button";


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);

  // API
  useEffect(() => {
    API.get(`/api/orders`)
      .then(({data}) => {
          console.log(data.message);
          setOrders(data.orders);
      })
      .catch(err => { console.log(err); });
    }, []);


    const deleteOrder = (id) => {
      API.delete(`/api/orders/${id}`)
        .then(({data}) => {
            console.log(data.message);
            setOrders(data.orders);
          }
        ).catch(err => { console.log(err); });
    }

    const deleteAllOrders = () => {
      API.delete("/api/orders")
        .then(({data}) => {
            console.log(data.message);
            setOrders(data.orders);
          }
        ).catch(err => { console.log(err); });
    }

    const sendOrder = (id) => {
      API.put(`/api/orders/${id}`)
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
        maxWidth: '60%',
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
                    <>
                      {i.send === false && 
                      <IconButton edge="end" aria-label="checkout" onClick={() => sendOrder(i._id)}>
                        <CheckCircleIcon />
                      </IconButton>
                    }
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteOrder(i._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
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
        <Button variant="contained" color="error" onClick={deleteAllOrders}>
          <DeleteIcon />
        </Button>
      </Grid>
    </Box>
  );
}

export default OrderAdmin;