import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAppStore } from "../../appStore";

export default function Login({ closeEvent }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const darkMode = useAppStore((state) => state.darkMode);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );

      const { token, user } = response.data;

      // Store the token and user info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "cashier":
          navigate("/cashier");
          break;
        case "barista":
          navigate("/barista");
          break;
        case "kitchen":
          navigate("/kitchen");
          break;
        case "waiter":
          navigate("/waiters");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackbarOpen(true);
      setSnackbarMessage(
        error.response.data.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <Box
      sx={{
        width: "400px",
        margin: "30px auto",
        textAlign: "center",
      }}
    >
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon
          sx={{
            color: darkMode ? "red" : "darkred",
          }}
        />
      </IconButton>
      <Stack direction="column" spacing={1}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: darkMode ? "#CBE4DE" : "#247158",
          }}
        >
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{
              style: {
                color: darkMode ? "#CBE4DE" : "#247158",
              },
            }}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#CBE4DE" : "#247158",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: darkMode ? "#CBE4DE" : "#247158",
                },
              },
            }}
          />
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              style: {
                color: darkMode ? "#CBE4DE" : "#247158",
              },
            }}
            InputProps={{
              sx: {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: darkMode ? "#CBE4DE" : "#247158",
                },
              },
            }}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: darkMode ? "#CBE4DE" : "#247158",
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: darkMode ? "#395B64" : "#247158",
              color: darkMode ? "#CBE4DE" : "#F5F5F5",
              "&:hover": {
                backgroundColor: darkMode ? "#CBE4DE" : "#247158",
                color: darkMode ? "#395B64" : "#F5F5F5",
              },
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
