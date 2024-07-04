// src/components/AuthTabs.js
import React, { useState } from "react";
import {
  Container,
  Box,
  Tabs,
  Tab,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Login from "./Login";
import Register from "../settings/Register";
import ForgotPassword from "./ForgotPassword";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#615EFC",
    },
  },
});

const AuthTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={tabIndex}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Login" />
              <Tab label="Register" />
              <Tab label="Forgot Password" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {tabIndex === 0 && <Login onTabChange={handleTabChange} />}
              {/* {tabIndex === 1 && <Register onTabChange={handleTabChange} />} */}
              {tabIndex === 1 && (
                <ForgotPassword onTabChange={handleTabChange} />
              )}
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default AuthTabs;
