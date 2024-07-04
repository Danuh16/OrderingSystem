import * as React from "react";
import {
  styled,
  alpha,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useAppStore } from "../appStore";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Button, DialogActions, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import { Home } from "@mui/icons-material";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  // { darkMode, setDarkMode }
  const { darkMode, setDarkMode } = useAppStore();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const [open, setOpen] = React.useState();
  //const [darkMode, setDarkMode] = React.useState(false); // New state for dark mode

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const handleSetting = () => {
  //   navigate("/settings");
  // };

  const handleSetting = () => {
    if (location.pathname === "/settings") {
      navigate("/waiters"); //**********************************Check this route************************************ */
    } else {
      navigate("/settings");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNotificationClick = () => {
    setOpen(true);
    //console.log("Notification Clicked");
  };

  const handleLogOutClick = async () => {
    try {
      // Call backend endpoint to clear session
      await axios.post("http://localhost:8000/logout");

      // Remove user token from local storage
      localStorage.removeItem("user");

      // Redirect user to the login page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
      // Handle logout failure, if necessary
    }
  };

  const handleModeChange = () => {
    setDarkMode(!darkMode);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSetting}>
        {location.pathname === "/settings" ? (
          <>
            <Home />
            Home
          </>
        ) : (
          <>
            <SettingsIcon />
            Setting
          </>
        )}
      </MenuItem>
      <MenuItem onClick={handleLogOutClick}>
        <LogoutIcon />
        Sign Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotificationClick}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar
            alt={JSON.parse(localStorage.getItem("user")).fullName}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
          />
        </IconButton>
        <p>{JSON.parse(localStorage.getItem("user")).fullName}</p>
      </MenuItem>
    </Menu>
  );

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#2E4F4F" : "#247158", //main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#CBE4DE" : "#121212", //#121212
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{ backgroundColor: theme.palette.primary.main, color: "#ffffff" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => updateOpen(!dopen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              GelatiAmo
            </Typography>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="toggle dark/light mode"
                color="inherit"
                onClick={handleModeChange}
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleNotificationClick}
              >
                <Badge badgeContent={20} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  alt={JSON.parse(localStorage.getItem("user")).fullName}
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: "30%",
              maxWidth: "50%",
              height: "60%",
              margin: "auto",
              transform: "translate(115%,-17%)",
              backgroundColor: darkMode ? "#2C3333" : undefined,
            },
          }}
        >
          <DialogTitle
            sx={{ m: 0, p: 2, color: darkMode ? "#CBE4DE" : "#247158" }}
          >
            Notifications
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: darkMode ? "red" : "darkred",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Divider />
          <List
            sx={{
              width: "100%",
              textAlign: "center",
              color: darkMode ? "#CBE4DE" : "#247158",
            }}
          >
            <ListItem
              sx={{
                justifyContent: "center",
              }}
            >
              <div>
                <h3>Notification 1</h3>
                <p>
                  Notification Detail Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <DialogActions>
                  <Button
                    sx={{
                      color: darkMode ? "red" : "#247158",
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    sx={{
                      color: darkMode ? "red" : "#247158",
                    }}
                  >
                    Decline
                  </Button>
                </DialogActions>
              </div>
            </ListItem>
            <Divider />
            <ListItem sx={{ justifyContent: "center" }}>
              <div>
                <h3>Notification 2</h3>
                <p>
                  Notification Detail Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
                <DialogActions>
                  <Button>Approve</Button>
                  <Button>Decline</Button>
                </DialogActions>
              </div>
            </ListItem>
          </List>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
