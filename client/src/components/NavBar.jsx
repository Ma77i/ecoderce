import * as React from "react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";

// import API from '../utils/api';

// const pages = ["Store", "Cart"];
const settings = ["Account", "Admin", "Logout"];


const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [ items, setItems ] = React.useState([]);

  const { auth, handleLogout } = useContext(AuthContext);

  // React.useEffect(() => {
  //   if (user) {
  //     console.log(user)
  //     API.get(`/api/cart/currentCart/${user._id}`, {
  //       headers: { Authorization: `Bearer ${auth.token}` }
  //     }).then(({ data }) => {
  //       console.log(data.message);
  //       setItems(data.cart.products);
  //     }).catch(err => { console.log(err); });
  //   } 
  // }, [auth, user ])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#778da9",
        light: "#778da9",
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "primary.light" }} />
            <Link className="link" to="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "primary.main",
                  textDecoration: "none"
                }}
              >
                ECODERCE
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
              {
                auth && (
                <>
                  <Button onClick={handleLogout}>Logout</Button>
                  <Link style={{ textDecoration: "none", color: "#415a77" }} to={`/chat`}>
                    <Button sx={{ my: 2, color: "#415a77", display: "block" }}>Chat</Button>
                  </Link>
                </>
              )}
                {/* {pages.map((page) => ( */}
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      style={{ textDecoration: "none", color: "#415a77" }}
                      to={`/store`}
                    >
                      <Typography textAlign="center">STORE</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                  <Badge badgeContent={1} color="error">
                    <Link to={`cart`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                        <Typography textAlign="center">CART</Typography>
                    </Link>
                      </Badge>
                </MenuItem>
                {/* ))} */}
              </Menu>
            </Box>

            {/* MOBILE */}
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              ECODERCE mobile
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {auth && (
                <>
                  <Button onClick={handleLogout}>Logout</Button>
                  <Link style={{ textDecoration: "none", color: "white" }} to={`/chat`}>
                    <Button sx={{ my: 2, color: "white", display: "block" }}>Chat</Button>
                  </Link>
                </>
              )}

              {/* {pages.map((page) => ( */}
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/store`}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    store
                  </Button>
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/cart`}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    >
                  <Badge badgeContent={ 0 } color="error">
                    cart
                    </Badge>
                  </Button>
                </Link>
              {/* ))} */}
            </Box>

            {auth && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="picture" src={auth.user.avatar} />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/${setting.toLowerCase()}`}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;
