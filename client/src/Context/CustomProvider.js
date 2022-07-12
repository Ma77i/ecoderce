import { useState, useEffect } from "react";
import { Provider } from "./Context";
import axios from 'axios';

const URL = 'http://localhost:8080/login';

const CustomProvider = ({ children }) => {
    
    const [token, setToken ] = useState(null)
    const [ userCredentials, setUserCredentials ] = useState({
      email: '',
      password: ''
    })

    const handleSubmit = (e) => {
      console.log(`Submit ${e.target.email.value} ${e.target.password.value}`)
      e.preventDefault();
      axios.post(URL, userCredentials)
        .then((res) => {
          const token = res.data;
          console.log(token)
          setToken(token)
          window.location.href="/products"
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

    useEffect(handleChange, [userCredentials])

    const contexto_para_consumir = {
        token,
        setToken,
        userCredentials,
        setUserCredentials,
        handleSubmit,
        handleChange
    }

    return (
        <Provider value={contexto_para_consumir}>
            {children}
        </Provider>

    )
}

export default CustomProvider;