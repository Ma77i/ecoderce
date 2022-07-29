import React from 'react'
import { AuthContext } from '../../Context/AuthContext';
import Typography from '@mui/material/Typography';
import axios from 'axios'

const Order = () => {
  const { auth } = React.useContext(AuthContext);

  React.useEffect(() => {
    axios.post(`/api/orders/${auth.user._id}`, {}, { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(({data}) => {
        console.log(data.message);
      })
      .catch((err) => console.log("Error getting orders", err));
  }, [auth]);

  return (
    <Typography variant="h2" component="div" align="center" gutterBottom>
      Orden realizada con exito, se ha enviado un mail a su casilla de correo, muchas gracias por su compra {auth.user.firstName}.
    </Typography>
  )
}

export default Order