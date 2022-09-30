import * as React from "react";
import SignIn from "../Sign/SignIn";
import SignUp from "../Sign/SignUp";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import Copyright from "../utils/Copyright";
import { useDispatch } from "react-redux";
import API from "../../utilities/api";
import { modifyUser } from "../../redux/states/user";
import { modifyAuth } from "../../redux/states/auth/authSlice";

const SignContainer = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const res = await API.post(`/api/sign/${param.sign}`, data);
      dispatch(modifyUser(res.data.user));
      dispatch(modifyAuth(res.data));
      navigate("/store");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {param.sign === "login" && <SignIn onSubmit={onSubmit} />}
      {param.sign === "register" && <SignUp onSubmit={onSubmit} />}
      <Copyright />
    </Container>
  );
};

export default SignContainer;
