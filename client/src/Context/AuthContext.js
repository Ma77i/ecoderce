import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_LOGIN = 'http://localhost:8080/login';
// const API_REGISTER = 'http://localhost:8080/register';
const API_LOGOUT = 'http://localhost:8080/logout';




export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [ auth, setAuth ] = useState(null)
  const [ user, setUser ] = useState(null)
  const [ userCredentials, setUserCredentials ] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    axios.post(API_LOGIN, userCredentials)
      .then((res) => {
        const token = res.data;
        console.log("TOKENFRONT: ", res.data.user);
        setAuth(token)
        setUser(res.data.user)
        localStorage.setItem('user', res.data)
        navigate('/store')
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleChange = (e) => {
    e.preventDefault();
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value
    })
  }

  const handleLogout = () => {
    axios.get(API_LOGOUT)
    setAuth(null)
    navigate("/")
  }

  const values = {
      auth: auth,
      user: user,
      setAuth: setAuth,
      userCredentials: userCredentials,
      setUserCredentials: setUserCredentials,
      handleSubmitLogin: handleSubmitLogin,
      handleChange: handleChange,
      handleLogout: handleLogout,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

