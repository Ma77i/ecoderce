import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_LOGIN = 'http://localhost:8080/api/sign/login';
const API_REGISTER = 'http://localhost:8080/sign/register';
const API_LOGOUT = 'http://localhost:8080/logout';




export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [ auth, setAuth ] = useState(null)
  const [ user, setUser ] = useState(null)
  const [ loginCredentials, setLoginCredentials ] = useState({
    email: '',
    password: ''
  })
  const [ registerCredentials, setRegisterCredentials ] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    axios.post(API_LOGIN, loginCredentials)
      .then((res) => {
        const token = res.data;
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
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    axios.post(API_REGISTER, registerCredentials)
      .then((res) => {
        const token = res.data;
        setAuth(token)
        setUser(res.data.user)
        localStorage.setItem('user', res.data)
        navigate('/store')
      })
      .catch((err) => {
        console.log(err)
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
      loginCredentials: loginCredentials,
      setLoginCredentials: setLoginCredentials,
      registerCredentials: registerCredentials,
      setRegisterCredentials: setRegisterCredentials,
      handleSubmitLogin: handleSubmitLogin,
      habdleSubmitRegister: handleSubmitRegister,
      handleChange: handleChange,
      handleLogout: handleLogout,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

