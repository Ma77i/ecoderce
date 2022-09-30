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
import { Link } from "react-router-dom";
import Logout from "../Sign/Logout";
import { useSelector } from "react-redux";
import CustomBadge from "../utils/CustomBadge";
import LinkPages from "./LinkPages";
import Settings from "./Settings";
import { LinkSignIn, LinkSignUp } from "./LinkSigns";

const pages = ["store", "chat", "cart"];
const settings = ["Account", "Admin", "Logout"];

const NavBar = () => {
  const authState = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);
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



  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "secondary.light" }}
          />
          <Link className="link" to="/">
            <Typography
              variant="h6"
              noWrap
              color="secondary"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
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
                {pages.map((page) => (
                  <Link
                    to={`/${page.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "primary" }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            )}
          </Box>

          {/* MOBILE */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Link className="link" to="/">
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              color="secondary"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none"
              }}
            >
              ECODERCE m
            </Typography>
          </Link>
          {authState && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, index) => (
                <LinkPages
                  key={index}
                  page={page}
                  handleCloseNavMenu={handleCloseNavMenu}
                />
              ))}
              {cartState && <CustomBadge />}
            </Box>
          )}

          {authState ? (
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
                <Logout />
                {settings.map((setting, index) => (
                  <Settings
                    key={index}
                    setting={setting}
                    handleCloseUserMenu={handleCloseUserMenu}
                  />
                ))}
              </Menu>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flexDirection: "row-reverse"
              }}
            >
              <LinkSignUp handleCloseNavMenu={handleCloseNavMenu} />
              <LinkSignIn handleCloseNavMenu={handleCloseNavMenu} />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
