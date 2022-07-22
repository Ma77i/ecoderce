import React from 'react'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'
const API_LOGOUT = "http://localhost:8080/api/logout"

const Logout = () => {
    const { setAuth } = React.useContext(AuthContext);
    const navigate = React.useNavigate();

    React.useEffect(() => {
        axios.get(API_LOGOUT)
        setAuth(null)
        navigate("/")
    }, [setAuth, navigate])
    
  return (
    <div>Logout</div>
  )
}

export default Logout