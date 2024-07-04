import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useState, useRef } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Stack } from "@mui/material";
import { useAppStore } from "../../appStore";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Personal() {
  const [avatarSrc, setAvatarSrc] = useState(""); // State to hold the selected avatar image
  const fileInputRef = useRef(null); // Reference for the hidden file input
  const darkMode = useAppStore((state) => state.darkMode);

  // Function to handle avatar click
  const handleAvatarClick = () => {
    // Trigger click event on the hidden file input
    fileInputRef.current.click();
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader(); // Create a FileReader instance
      reader.onload = () => {
        // Callback function when file reading is completed
        setAvatarSrc(reader.result); // Update the avatar image source
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  return (
    <Box
      sx={{
        padding: "20px",
        width: "500px",
        margin: "30px auto",
        textAlign: "center",
      }}
    >
      <Stack direction="row" spacing={5}>
        <div>
          <input
            accept="image/*"
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          {avatarSrc ? (
            <Avatar
              alt="User Avatar"
              src={avatarSrc}
              sx={{ width: 100, height: 100 }}
              onClick={handleAvatarClick}
            />
          ) : (
            <label>
              <Avatar
                sx={{ width: 100, height: 100 }}
                onClick={handleAvatarClick}
              >
                <AddAPhotoIcon />
              </Avatar>
            </label>
          )}
        </div>
        <Stack direction="column" spacing={1}>
          <TextField
            id="standard-basic"
            label="First Name"
            variant="standard"
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
            id="standard-basic"
            label="Last Name"
            variant="standard"
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
            id="standard-basic"
            label="Phone Number"
            variant="standard"
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
            id="standard-basic"
            label="Email"
            type="email"
            variant="standard"
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

          <Typography variant="h5" align="center">
            <Button
              variant="contained"
              onClick={console.log("Update Profile")}
              sx={{
                backgroundColor: darkMode ? "#0E8388" : "#186049",
                "&:hover": {
                  backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
                  color: darkMode ? "#CBE4DE" : undefined,
                },
              }}
            >
              Update
            </Button>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
