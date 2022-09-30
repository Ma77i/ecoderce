import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  
  const navigate = useNavigate();
  const authState = useSelector(state=>state.auth)
  
  React.useEffect(() => {
    if (!authState) {
      navigate("/login");
    }
  }, [authState, navigate]);

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
