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
const API_URL = "http://localhost:8080/api/users";


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const UserAdmin = () => {
  const [users, setUsers] = React.useState([]);
  
  // API
  React.useEffect(() => {
    axios.get(`${API_URL}`)
      .then(({data}) => {
          setUsers(data);
        }
      )
    }, []);

  console.log(users);
  
  return (
    // <>
    //   {
    //     items.map((item) => (
    //       <div key={item._id}>
    //         <p>{item.title}</p>
    //       </div>
    //     ))
    //   }
    // </>
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
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
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt={i.title} src={i.thumbnail} />
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