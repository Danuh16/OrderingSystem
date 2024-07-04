import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import { useAppStore } from "../../appStore";
import axios from "axios"; // Import axios for making HTTP requests
import Button from "@mui/material/Button";
import {
  Stack,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  ListItem,
  IconButton,
  List,
  Modal,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ResetPassword from "./ResetPassword";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

export default function Profile() {
  const [user, setUser] = useState(null); // State to hold user profile data
  const [loading, setLoading] = useState(true);
  const darkMode = useAppStore((state) => state.darkMode);
  const [open, setOpen] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePasswordClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Check if user data exists in local storage
        const storedUser = JSON.parse(window.localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser); // Set user from local storage
          setLoading(false);
        } else {
          // // If no user data in local storage, fetch from backend
          // const response = await axios.get("http://localhost:8000/protected");
          // setUser(response.data); // Assuming backend sends user data in response.data
          // setLoading(false);
          return (
            <Paper
              sx={{
                padding: "20px",
                width: "300px",
                margin: "20px auto",
                textAlign: "center",
                backgroundColor: darkMode ? "#2E4F4F" : "#247158",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: darkMode ? "#CBE4DE" : "#ffffff" }}
              >
                User profile not found.
              </Typography>
            </Paper>
          );
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile(); // Call fetchUserProfile on component mount
  }, []);

  if (loading) {
    return (
      <Paper
        sx={{
          padding: "20px",
          width: "300px",
          margin: "20px auto",
        }}
      >
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="text" width={250} height={20} />
      </Paper>
    );
  }

  if (!user) {
    return (
      <Paper
        sx={{
          padding: "20px",
          width: "300px",
          margin: "20px auto",
          textAlign: "center",
          backgroundColor: darkMode ? "#2E4F4F" : "#247158",
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: darkMode ? "#CBE4DE" : "#ffffff" }}
        >
          User profile not found.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <ResetPassword onCloseButton={handleClose} />
        </Box>
      </Modal>
      <Paper
        sx={{
          padding: "20px",
          width: "450px",
          margin: "20px auto",
          //textAlign: "center",
          backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={user.username}
            src={user.profilePicture} // Assuming user.profilePicture is provided by backend
            sx={{ width: 80, height: 80, margin: "0 auto" }}
          />
          <Box height={20} />
          <Stack direction="column" spacing={2}>
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body1">{user.role}</Typography>
            <Typography variant="body2">
              <span style={{ textDecoration: "underLine" }}>Role:</span>
              {user.role}
            </Typography>
            {/* Add more fields as per your UserSchema */}
            <Typography variant="h5" align="center">
              <Button
                variant="contained"
                onClick={handleChangePasswordClick}
                sx={{
                  backgroundColor: darkMode ? "#0E8388" : "#186049",
                  "&:hover": {
                    backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
                    color: darkMode ? "#CBE4DE" : undefined,
                  },
                }}
              >
                Change Password
              </Button>
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}
