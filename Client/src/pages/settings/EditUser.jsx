import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { useAppStore } from "../../appStore";
import Swal from "sweetalert2";

import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

export default function EditUser({ fid, closeEvent }) {
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const setRows = useAppStore((state) => state.rows);
  const editUser = useAppStore((state) => state.editUser);
  const darkMode = useAppStore((state) => state.darkMode);

  const [error, setError] = useState(null);

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "waiter", label: "Waiter" },
    { value: "barista", label: "Barista" },
    { value: "kitchen", label: "Kitchen" },
    { value: "cashier", label: "Cashier" },
  ];

  useEffect(() => {
    setUserName(fid.username);
    setFirstName(fid.firstName);
    setLastName(fid.lastName);
    setRole(fid.role);
  }, [fid]);

  const handeleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handeleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handeleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handeleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        process.env.REACT_APP_BASE_URL + `/user/update/${fid.username}`,
        {
          username,
          firstName,
          lastName,
          role,
        }
      );
      editUser(response); // Call editUser with the updated User data
      Swal.fire({
        title: "Submitted!",
        text: "User has been Updated.",
        icon: "success",
        background: darkMode ? "#2E4F4F" : "#FFFFFF", // Change background color based on dark mode
        color: darkMode ? "#CBE4DE" : "#2C3333", // Change background color based on dark mode
        didOpen: () => {
          // Apply inline styles to the SweetAlert2 confirm button
          const confirmButton = document.querySelector(".swal2-confirm");
          if (confirmButton) {
            confirmButton.style.backgroundColor = darkMode
              ? "#0E8388"
              : "#186049"; // Change button background color to black
            confirmButton.style.color = darkMode ? "#CBE4DE" : undefined; // Change button text color to white // Change button text color to white
            // Add event listeners for hover effect
            confirmButton.addEventListener("mouseenter", () => {
              confirmButton.style.backgroundColor = darkMode
                ? "#2E4F4F"
                : "#95877A"; // Change background on hover
              confirmButton.style.color = darkMode ? "#CBE4DE" : undefined; // Ensure text color remains white
            });

            confirmButton.addEventListener("mouseleave", () => {
              confirmButton.style.backgroundColor = darkMode
                ? "#0E8388"
                : "#186049"; // Revert background when not hovered
              confirmButton.style.color = darkMode ? "#CBE4DE" : undefined; // Ensure text color remains white // Ensure text color remains white
            });
          }
        },
      });
      closeEvent(); // Close the modal or form after successful submission
    } catch (error) {
      // Handle error
      setError(error.response.message || "An error occurred.");
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
      >
        Edit User
      </Typography>
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
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="User Name"
            variant="outlined"
            value={username}
            onChange={handeleUserNameChange}
            sx={{ minWidth: "100%" }}
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={handeleFirstNameChange}
            sx={{ minWidth: "100%" }}
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={handeleLastNameChange}
            sx={{ minWidth: "100%" }}
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Role"
            select
            variant="outlined"
            value={role}
            onChange={handeleRoleChange}
            sx={{ minWidth: "100%" }}
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
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: darkMode ? "#0E8388" : "#186049",
                "&:hover": {
                  backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
                  color: darkMode ? "#CBE4DE" : undefined,
                },
              }}
            >
              Submit
            </Button>
            {error && (
              <Snackbar
                open
                autoHideDuration={6000}
                onClose={() => setError(null)}
                message={error}
              />
            )}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
