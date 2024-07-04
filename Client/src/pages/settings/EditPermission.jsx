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

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function EditPermission({ fid, closeEvent }) {
  const setRows = useAppStore((state) => state.rows);
  const editUser = useAppStore((state) => state.editUser);
  const darkMode = useAppStore((state) => state.darkMode);

  const [error, setError] = useState(null);

  const permissions = ["Update", "Delete", "Create", "Read"];

  //   const handleSubmit = async () => {
  //     try {
  //       const response = await axios.patch(
  //         `http://localhost:8000/product/update/${fid.fullName}`,
  //         {
  //           fullName,
  //           email,
  //           role,
  //         }
  //       );
  //       editUser(response.data); // Call editUser with the updated User data
  //       Swal.fire({
  //         title: "Submitted!",
  //         text: "User has been Updated.",
  //         icon: "success",
  //         background: darkMode ? "#2E4F4F" : "#FFFFFF", // Change background color based on dark mode
  //         color: darkMode ? "#CBE4DE" : "#2C3333", // Change background color based on dark mode
  //         didOpen: () => {
  //           // Apply inline styles to the SweetAlert2 confirm button
  //           const confirmButton = document.querySelector(".swal2-confirm");
  //           if (confirmButton) {
  //             confirmButton.style.backgroundColor = darkMode
  //               ? "#0E8388"
  //               : "#186049"; // Change button background color to black
  //             confirmButton.style.color = darkMode ? "#CBE4DE" : undefined; // Change button text color to white // Change button text color to white
  //             // Add event listeners for hover effect
  //             confirmButton.addEventListener("mouseenter", () => {
  //               confirmButton.style.backgroundColor = darkMode
  //                 ? "#2E4F4F"
  //                 : "#95877A"; // Change background on hover
  //               confirmButton.style.color = darkMode ? "#CBE4DE" : undefined; // Ensure text color remains white
  //             });

  //             confirmButton.addEventListener("mouseleave", () => {
  //               confirmButton.style.backgroundColor = darkMode
  //                 ? "#0E8388"
  //                 : "#186049"; // Revert background when not hovered
  //               confirmButton.style.color = darkMode ? "#CBE4DE" : undefined; // Ensure text color remains white // Ensure text color remains white
  //             });
  //           }
  //         },
  //       });
  //       closeEvent(); // Close the modal or form after successful submission
  //     } catch (error) {
  //       // Handle error
  //       setError(error.response.data.message || "An error occurred.");
  //     }
  //   };

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
      >
        Permissions
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
        <FormGroup>
          {permissions.map((permission, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox />}
              label={permission}
            />
          ))}
        </FormGroup>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button
              variant="contained"
              //   onClick={handleSubmit}
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
