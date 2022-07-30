import React from 'react'
import API from '../utils/api';
import { AuthContext } from '../../Context/AuthContext'

const Logout = () => {
    const { setAuth } = React.useContext(AuthContext);
    const navigate = React.useNavigate();

    React.useEffect(() => {
        API.get(`/api/logout`)
        setAuth(null)
        navigate("/")
    }, [setAuth, navigate])
    
  return (
    <div>Logout</div>
  )
}

export default Logout