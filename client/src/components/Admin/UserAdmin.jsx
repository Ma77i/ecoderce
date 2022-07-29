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


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const UserAdmin = () => {
  const [users, setUsers] = React.useState([]);
  
  // API
  React.useEffect(() => {
    axios.get(`/api/users`)
      .then(({data}) => {
          console.log(data.message);
          setUsers(data.users);
        }
      )
    }, []);

  console.log("CHECKOUT PASSWORD ENCRYPTED", users);

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(({data}) => {
          console.log(data.message);
          setUsers(data.users);
        }
      ).catch(err => { console.log(err); });
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" align="center" gutterBottom>
            Users
          </Typography>
          <Demo>
            <List>
              {users.map((i)=> (
                <ListItem key={i._id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(i._id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt="user" src={i.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={i.firstName + " " + i.lastName}
                    secondary={i.email}
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

export default UserAdmin;