import * as React from 'react';
import { AuthContext } from '../../Context/AuthContext';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
  palette: {
    primary: {
      main: '#778da9',
    },
    secondary: {
      main: '#415a77',
      dark: '#1b263b'
    },
  },
});

const SignUp = () => {

  const dispatch = useDispatch()
  // const { registerCredentials, handleSubmitRegister, handleChangeRegister } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const { registerCredentials, handleChangeRegister, setAuth, setUser } = React.useContext(AuthContext);


  // const handleSubmitRegister = (e) => {
  //   e.preventDefault();
  //   API.post("/api/sign/register", registerCredentials)
  //     .then((res) => {
  //       const token = res.data;
  //       setAuth(token)
  //       setUser(res.data.user)
  //       navigate('/store')
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  const handleSubmitRegister = (e) => {
    e.preventDefault()
    dispatch(registerCredentials)
    navigate("/store")
        setUser(registerCredentials)
  }

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
    <Box component="form" noValidate onSubmit={handleSubmitRegister} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            value={registerCredentials.firstName}
            onChange={handleChangeRegister} 
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={registerCredentials.lastName}
            onChange={handleChangeRegister}
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            value={registerCredentials.userName}
            onChange={handleChangeRegister}
            autoComplete="user-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={registerCredentials.phone}
            onChange={handleChangeRegister}
            autoComplete="phone"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={registerCredentials.email}
            onChange={handleChangeRegister}
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={registerCredentials.password}
            onChange={handleChangeRegister}
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={registerCredentials.confirmPassword}
            onChange={handleChangeRegister}
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