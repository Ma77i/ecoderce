import React from 'react'
import Typography from '@mui/material/Typography';
import API from '../../utils/api';
import { useSelector } from 'react-redux';

const Order = () => {
  const authState = useSelector(state=>state.auth)
  const userState = useSelector(state=>state.user)


  React.useEffect(() => {
    API.post(`/api/orders/${userState._id}`, {}, { headers: { Authorization: `Bearer ${authState.token}` } })
      .then(({data}) => {
        console.log(data.message);
      })
      .catch((err) => console.log("Error getting orders", err));
  }, [authState, userState]);

  return (
    <Typography 
      variant="h2" 
      component="div"
      align="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        margin: "0 auto",
        letterSpacing: "0.5rem",
        color: "#252525",
        padding: "1rem"
      }} 
      gutterBottom>
      Orden realizada con exito, se ha enviado un mail a su casilla de correo, muchas gracias por su compra {userState.firstName}.
    </Typography>
  )
}

export default Order