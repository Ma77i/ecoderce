import API from "../../utilities/api";
import { Button, MenuItem, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <Button onClick={handleLogout}>
      <MenuItem >
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
    </Button>
  );
};

export default Logout;
