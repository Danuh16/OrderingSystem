import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../appStore";
import { useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import ErrorIcon from "@mui/icons-material/Error";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import KitchenIcon from "@mui/icons-material/Kitchen";
import RecipeIcon from "@mui/icons-material/Receipt";

import PeopleIcon from "@mui/icons-material/People";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import CoffeeIcon from "@mui/icons-material/Coffee";
import WaiterDashboard from "../pages/Waiters";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  // backgroundColor: "#247158",
  color: "#247158",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  // backgroundColor: "#247158",
  //color: "#ffffff",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // color: "#186049",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav() {
  const theme = useTheme();
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [ordersCollapseOpen, setOrdersCollapseOpen] = useState(true);
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);
  const darkMode = useAppStore((state) => state.darkMode);

  const routes = {
    Waiters: "/waiters",
    Kitchen: "/kitchen",
    Cashier: "/cashier",
    Barista: "/barista",
  };
  const default_route = "/";

  const iconMapping = {
    Waiters: <PeopleIcon />,
    Kitchen: <RestaurantIcon />,
    Barista: <CoffeeIcon />,
    Cashier: <PaymentIcon />,
    // Default icon for undefined text
    Default: <ErrorIcon />,
  };

  const handleClick = (text) => {
    const route = routes[text];
    if (routes[text]) {
      navigate(route);
    } else {
      alert("Route not found, navigating to default route.");
      navigate(default_route);
    }
  };

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const handleCollapseClick = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleOrdersCollapseClick = () => {
    setOrdersCollapseOpen(!ordersCollapseOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Divider />
        {/* <List>
          <ListItemButton onClick={handleCollapseClick}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: darkMode ? "#CBE4DE" : "#247158",
              }}
            >
              <InventoryIcon
                sx={{
                  color: darkMode ? "#CBE4DE" : "#247158",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Stock Management"
              sx={{
                opacity: open ? 1 : 0,
                color: darkMode ? "#CBE4DE" : "#247158",
              }}
            />
            {collapseOpen ? (
              <ExpandLess sx={{ color: darkMode ? "#CBE4DE" : "#247158" }} />
            ) : (
              <ExpandMore sx={{ color: darkMode ? "#CBE4DE" : "#247158" }} />
            )}
          </ListItemButton>
          <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <List>
              {[
                "Dashboard",
                "Product",
                "Product Recipe",
                "Category",
                "Stock Movement",
                "Branch",
                "Ingredients",
                //"Settings",
                //"Analytics",
                "Error",
              ].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => handleClick(text)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: darkMode ? "#CBE4DE" : "#247158",
                      }}
                    >
                      {iconMapping[text] || iconMapping.Default}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: darkMode ? "#CBE4DE" : "#247158",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List> */}

        <List>
          <ListItemButton onClick={handleOrdersCollapseClick}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: darkMode ? "#CBE4DE" : "#247158",
              }}
            >
              <InventoryIcon
                sx={{
                  color: darkMode ? "#CBE4DE" : "#247158",
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Orders"
              sx={{
                opacity: open ? 1 : 0,
                color: darkMode ? "#CBE4DE" : "#247158",
              }}
            />
            {ordersCollapseOpen ? (
              <ExpandLess sx={{ color: darkMode ? "#CBE4DE" : "#247158" }} />
            ) : (
              <ExpandMore sx={{ color: darkMode ? "#CBE4DE" : "#247158" }} />
            )}
          </ListItemButton>
          <Collapse in={ordersCollapseOpen} timeout="auto" unmountOnExit>
            <List>
              {["Waiters", "Kitchen", "Barista", "Cashier"].map(
                (text, index) => (
                  <ListItem
                    key={text}
                    disablePadding
                    sx={{ display: "block" }}
                    onClick={() => handleClick(text)}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: darkMode ? "#CBE4DE" : "#247158",
                        }}
                      >
                        {iconMapping[text] || iconMapping.Default}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{
                          opacity: open ? 1 : 0,
                          color: darkMode ? "#CBE4DE" : "#247158",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
          </Collapse>
        </List>
      </Drawer>
    </Box>
  );
}
