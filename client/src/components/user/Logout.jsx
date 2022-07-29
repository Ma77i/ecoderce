import React from 'react'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthContext'

const Logout = () => {
    const { setAuth } = React.useContext(AuthContext);
    const navigate = React.useNavigate();

    React.useEffect(() => {
        axios.get(`/api/logout`)
        setAuth(null)
        navigate("/")
    }, [setAuth, navigate])
    
  return (
    <div>Logout</div>
  )
}

export default Logout