import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../components/utils/api';


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [ auth, setAuth ] = useState(null)
  
  const [ error, setError ] = useState(null)
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

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const res = await API.post(`/api/sign/login`, loginCredentials)
    if (res.status === 401) {
      console.log(res)
      setError(res.data.message)
    }
    try {
      setAuth(res.data)
      setUser(res.data.user)
      navigate('/store')
    } catch (err) {
      console.log(err)
      setError(err.res.data.message)
    }
      // .then((res) => {
      //   const token = res.data;
      //   setAuth(token)
      //   setUser(res.data.user)
      //   localStorage.setItem('user', res.data)
      //   navigate('/store')
      // })
      // .catch((err) => {
      //   console.log(err)
      //   setError(err.response.data.message)
      // })
  };
  console.log(error)


  const handleChangeLogin = (e) => {
    e.preventDefault();
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeRegister = (e) => {
    e.preventDefault();
    setRegisterCredentials({
      ...registerCredentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitRegister = (e) => {
    console.log("antes")
    e.preventDefault();
    console.log("despues")
    API.post(`/api/sign/register`, registerCredentials)
      .then((res) => {
        const token = res.data;
        setAuth(token)
        setUser(res.data.user)
        navigate('/store')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLogout = () => {
    API.get(`/api/sign/logout`)
    setAuth(null)
    navigate("/")
  }

  const values = {
      auth: auth,
      user: user,
      setUser: setUser,
      setAuth: setAuth,
      loginCredentials: loginCredentials,
      setLoginCredentials: setLoginCredentials,
      registerCredentials: registerCredentials,
      setRegisterCredentials: setRegisterCredentials,
      handleSubmitLogin: handleSubmitLogin,
      habdleSubmitRegister: handleSubmitRegister,
      handleChangeLogin: handleChangeLogin,
      handleChangeRegister: handleChangeRegister,
      handleLogout: handleLogout,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

