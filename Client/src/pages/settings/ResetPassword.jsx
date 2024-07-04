import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  Button,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useAppStore } from "../../appStore";

export default function ResetPassword({ onCloseButton }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const darkMode = useAppStore((state) => state.darkMode);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submit, setSubmit] = useState(false); // New state to trigger useEffect

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError("");
    setMessage("");
  };

  return (
    <>
      <Box
        sx={{
          width: "500px",
          textAlign: "center",
        }}
      >
        {error && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            message={error}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        )}
        {message && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            message={message}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        )}
        <Paper
          sx={{
            padding: "20px",
            width: "450px",
            margin: "20px auto",
            backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
          }}
        >
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={onCloseButton}
          >
            <CloseIcon
              sx={{
                color: darkMode ? "red" : "darkred",
              }}
            />
          </IconButton>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: darkMode ? "#CBE4DE" : "#247158",
            }}
          >
            Change Password
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Stack direction="column" spacing={2}>
              <TextField
                variant="standard"
                margin="normal"
                required
                id="password"
                label="Old Password"
                name="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                inputProps={{
                  style: {
                    color: darkMode ? "#CBE4DE" : "#247158",
                  }, // Change text color
                }}
                InputProps={{
                  sx: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "#CBE4DE" : "#247158", // Change border color on focus
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: darkMode ? "#CBE4DE" : "#247158", // Change label color on focus
                    },
                  },
                }}
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                name="password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                inputProps={{
                  style: {
                    color: darkMode ? "#CBE4DE" : "#247158",
                  }, // Change text color
                }}
                InputProps={{
                  sx: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "#CBE4DE" : "#247158", // Change border color on focus
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: darkMode ? "#CBE4DE" : "#247158", // Change label color on focus
                    },
                  },
                }}
              />
              <TextField
                variant="standard"
                margin="normal"
                required
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                inputProps={{
                  style: {
                    color: darkMode ? "#CBE4DE" : "#247158",
                  }, // Change text color
                }}
                InputProps={{
                  sx: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "#CBE4DE" : "#247158", // Change border color on focus
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: darkMode ? "#CBE4DE" : "#247158", // Change label color on focus
                    },
                  },
                }}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: darkMode ? "#0E8388" : "#186049",
                  "&:hover": {
                    backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
                    color: darkMode ? "#CBE4DE" : undefined,
                  },
                  borderRadius: 28,
                }}
                onClick={onCloseButton}
              >
                Reset Password
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
