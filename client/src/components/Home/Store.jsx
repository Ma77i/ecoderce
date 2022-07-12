import React from 'react'
import { useContext } from 'react'
// import { StoreContext } from '../../Context/StoreContext'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'

const API_STORE = 'http://localhost:8080/store';

const Store = () => {
    
  // const { user, cart, product } = useContext(StoreContext)
  const { auth, userCredentials } = useContext(AuthContext)
  



  const [user, setUser] = React.useState(null);

    React.useEffect(() => {
      try {
        axios.get(API_STORE,
          {
            headers: {
            Authorization: `Bearer ${auth}`
            }
          }
          ).then(({res}) => {
          console.log("RES: ", res);
          console.log("RESDATA: ", res.data);
          setUser(res.data.user);
        });
      } catch (error) {
        console.log("ERR: ", error)
        if( error.res ){
          console.log("ERRORRRR: ", error.res.data);
      }
      }
    }, [auth])

  return (
    <div>Store
      <h2>Bienvenido {userCredentials.email}</h2>
      <div>User: {user}</div>
    </div>
  )
}

export default Store