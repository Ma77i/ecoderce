import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  
  const navigate = useNavigate();
  const { auth } = React.useContext(AuthContext);
  
  React.useEffect(() => {
    if (!auth) {
      console.log("authPVTR: ", auth);

      navigate("/login");
    }
  }, [auth, navigate]);

  return children;
};

export default ProtectedRoute;
