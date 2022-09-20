import API from "../../utils/api";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuth } from "../../redux/states/auth/authSlice";
import { resetUser } from "../../redux/states/user";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    API.get(`/api/sign/logout`);
    dispatch(resetAuth());
    dispatch(resetUser());
    navigate("/");
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default Logout;
