import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  
  const navigate = useNavigate();
  const authState = useSelector(state=>state.auth)
  
  React.useEffect(() => {
    if (!authState) {
      navigate("/login");
    }
  }, [authState, navigate]);

  return children;
};

export default ProtectedRoute;
