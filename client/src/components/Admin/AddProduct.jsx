import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import API from '../../utils/api';


const theme = createTheme({
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#303f9f',
    },
  },
});

const AddProduct = () => {
  const [product, setProduct] = React.useState({
    title: '',
    price: '',
    thumbnail: '',

  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post(`/api/products`, product)
      .then(({res}) => {
        console.log(res.message);
      })
      .catch(err => console.log(err));
    navigate('/admin/products');
    }

  const handleChange = (e) => {
    e.preventDefault();
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AddBoxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              value={product.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="price"
              id="price"
              value={product.price}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="thumbnail"
              label="thumbnail"
              type="thumbnail"
              id="thumbnail"
              value={product.thumbnail}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );

};

export default AddProduct;