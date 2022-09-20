import { useState } from "react";
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
import Logout from "../Sign/Logout";
import { useSelector } from "react-redux";

// const pages = ["Store", "Cart"];
const settings = ["Account", "Admin", "Logout"];

const NavBar = () => {
  const authState = useSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
        light: "#778da9"
      }
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "primary.light" }}
            />
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
              {authState && (
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
                  <Logout />
                  <Link style={{ textDecoration: "none", color: "#415a77" }} to={`/chat`}>
                    <Button sx={{ my: 2, color: "#415a77", display: "block" }}>
                      Chat
                    </Button>
                  </Link>
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
                      <Link
                        to={`cart`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <Typography textAlign="center">CART</Typography>
                      </Link>
                    </Badge>
                  </MenuItem>
                  {/* ))} */}
                </Menu>
              )}
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
              {authState && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>

                  <Logout />
                  <Link style={{ textDecoration: "none", color: "white" }} to={`/chat`}>
                    <Button sx={{ my: 2, color: "white", display: "block" }}>Chat</Button>
                  </Link>

              {/* {pages.map((page) => ( */}
              <Link style={{ textDecoration: "none", color: "white" }} to={`/store`}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  store
                </Button>
              </Link>
              <Link style={{ textDecoration: "none", color: "white" }} to={`/cart`}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Badge badgeContent={0} color="error">
                    cart
                  </Badge>
                </Button>
              </Link>
              {/* ))} */}
            </Box>
              )}

            {authState && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="picture" src={authState.user.avatar} />
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
                  {settings.map((setting, index) => (
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/${setting.toLowerCase()}`}
                      key={index}
                    >
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </Link>
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
