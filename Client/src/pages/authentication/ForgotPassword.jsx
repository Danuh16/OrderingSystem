import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  colors,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import axios from "axios"; // Import axios for API requests

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#E4D5C7", // default: "#121212",
      paper: "#247158", // Example value for paper background in dark mode paper: "#615EFC",
    },
  },
});

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 4,
  bgcolor: "background.paper",
  boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
  borderRadius: 2,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
};

export default function ForgotPassword({ onTabChange }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("API_ENDPOINT");
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error("Error fetching data: ", error);
    //   }
    // };
    // fetchData();
  }, []);

  const handleLoginClick = () => {
    onTabChange(0); // Change tab index to login (index 0)
  };

  // const handleResetPassword = () => {
  //   // forgotPassword({ email });
  //   navigate("/login");
  // };

  const handleResetPassword = () => {
    // Call resetPassword function from auth module
    // //resetPassword(email);
    // Redirect to login page
    navigate("/home");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          //backgroundColor: "black",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box sx={boxStyle}>
            <Avatar
              sx={{
                m: 1,
                backgroundColor: "#6AB29B", // backgroundColor: "#1bbd7e",
              }}
            >
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="#ffffff">
              Forgot Password
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#6AB29B",
                  "&:hover": {
                    backgroundColor: "#95877A",
                  }, //backgroundColor: "#FF9A01",
                  color: "#ffffff",
                  borderRadius: 28,
                }}
                onClick={handleResetPassword}
              >
                Reset Password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography
                    variant="body2"
                    color="#ffffff"
                    onClick={handleLoginClick}
                    sx={{
                      cursor: "pointer",
                      textAlign: "center",
                      mt: 2,
                    }}
                  >
                    Remembered your password? Login
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
