import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

const SignUp = ({ onSubmit }) => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
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
              {...register("firstName", { required: "Required" })}
              autoFocus
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              {...register("lastName", { required: "Required" })}
              autoComplete="family-name"
              error={Boolean(errors.lasName)}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              {...register("userName", { required: "Required" })}
              autoComplete="user-name"
              error={Boolean(errors.userName)}
              helperText={errors.userName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              {...register("phone", { required: "Required" })}
              autoComplete="phone"
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              {...register("email", { required: "Required" })}
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              {...register("password", { required: "Required" })}
              autoComplete="new-password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: "Required" })}
              autoComplete="new-confirm-password"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
            />
          </Grid>
          {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
        </Grid> */}
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
  );
};

export default SignUp;
