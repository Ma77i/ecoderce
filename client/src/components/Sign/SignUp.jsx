import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { createUser } from '../../redux/states/user';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import API from "../../utils/api"
import { modifyAuth } from '../../redux/states/auth/authSlice';



const SignUp = ({theme}) => {

  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

    const onSubmit = (data) => {
      API.post(`/api/sign/register`, data)
      .then(res=>{
        dispatch(createUser(res.data.user))
        dispatch(modifyAuth(res.data))
        navigate('/store')
      })
      .catch((err) => {
        console.log(err)
      })
    };

  return (
    <ThemeProvider theme={theme}>

    <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            fullWidth
            id="firstName"
            label="First Name"
            {...register("firstName", {required: "Required"})}
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            {...register("firstName", {required: "Required"})}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            {...register("firstName", {required: "Required"})}
            autoComplete="user-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            {...register("firstName", {required: "Required"})}
            autoComplete="phone"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            {...register("firstName", {required: "Required"})}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            {...register("firstName", {required: "Required"})}
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            {...register("firstName", {required: "Required"})}
            autoComplete="new-confirm-password"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid> */}
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Box>
    </ThemeProvider>
  )
}

export default SignUp