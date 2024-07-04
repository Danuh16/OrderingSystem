// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Stack,
//   Typography,
//   TextField,
//   MenuItem,
//   Select,
//   Checkbox,
//   ListItemText,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

// import { useAppStore } from "../../appStore";

// export default function Register({ closeEvent }) {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [permissions, setPermissions] = useState([]);
//   const rows = useAppStore((state) => state.rows);
//   const setRows = useAppStore((state) => state.setRows);
//   const navigate = useNavigate();
//   const availablePermissions = ["create", "read", "update", "delete"]; // Example permissions
//   const roles = [
//     { value: "admin", label: "Admin" },
//     { value: "stockControl", label: "Stock Controler" },
//     { value: "employee", label: "Employee" },
//   ]; // Example roles

//   const darkMode = useAppStore((state) => state.darkMode);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [submit, setSubmit] = useState(false); // New state to trigger useEffect

//   const handleRegister = async () => {
//     // Check if passwords match
//     if (password !== confirmPassword) {
//       setSnackbarMessage("Passwords do not match");
//       setSnackbarSeverity("error");
//       setSnackbarOpen(true);
//       return;
//     }

//     const fullName = `${firstName} ${lastName}`;

//     try {
//       const response = await axios.post("http://localhost:8000/signup", {
//         fullName,
//         email,
//         password,
//         role,
//         permissions,
//       });
//       setRows([...rows, response.data]);

//       // Assuming the backend response has a message and status
//       const { message, status } = response.data;
//       //const data = response.data;

//       if (status === 201) {
//         setMessage(message);
//         setSnackbarOpen(true);
//         //navigate("/home");
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");
//         setRole("");
//         setPermissions([]);
//       } else {
//         setMessage(message);
//         setSnackbarOpen(true);
//       }
//     } catch (error) {
//       if (error.response) {
//         // Server responded with a status other than 200 range
//         setError(error.response.data.message);
//       } else {
//         // Something else happened while setting up the request
//         console.error("Error:", error.message);
//         setError("An error occurred. Please try again.");
//       }
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//       setSubmit(false); // Reset submit to false after the request completes
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//     setError("");
//     setMessage("");
//   };

//   return (
//     <Box
//       sx={{
//         width: "500px",
//         margin: "30px auto",
//         textAlign: "center",
//       }}
//     >
//       {error && (
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={5000}
//           onClose={handleSnackbarClose}
//           message={error}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         />
//       )}
//       {message && (
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={5000}
//           onClose={handleSnackbarClose}
//           message={message}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         />
//       )}
//       <IconButton
//         style={{ position: "absolute", top: "0", right: "0" }}
//         onClick={closeEvent}
//       >
//         <CloseIcon
//           sx={{
//             color: darkMode ? "red" : "darkred",
//           }}
//         />
//       </IconButton>
//       <Stack direction="column" spacing={1}>
//         <Typography
//           component="h1"
//           variant="h5"
//           sx={{
//             color: darkMode ? "#CBE4DE" : "#247158",
//           }}
//         >
//           Add User
//         </Typography>
//         <Box component="form" noValidate sx={{ mt: 1 }}>
//           <Stack direction="row" spacing={2}>
//             <TextField
//               variant="standard"
//               margin="normal"
//               required
//               fullWidth
//               id="firstName"
//               label="First Name"
//               name="firstName"
//               autoComplete="name"
//               autoFocus
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               inputProps={{
//                 style: {
//                   color: darkMode ? "#CBE4DE" : "#247158",
//                 }, // Change text color
//               }}
//               InputProps={{
//                 sx: {
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: darkMode ? "#CBE4DE" : "#247158", // Change border color on focus
//                   },
//                 },
//               }}
//               InputLabelProps={{
//                 sx: {
//                   "&.Mui-focused": {
//                     color: darkMode ? "#CBE4DE" : "#247158", // Change label color on focus
//                   },
//                 },
//               }}
//             />
//             <TextField
//               variant="standard"
//               margin="normal"
//               required
//               fullWidth
//               id="lastName"
//               label="Last Name"
//               name="lastName"
//               autoComplete="name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               inputProps={{
//                 style: {
//                   color: darkMode ? "#CBE4DE" : "#247158",
//                 }, // Change text color
//               }}
//               InputProps={{
//                 sx: {
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: darkMode ? "#CBE4DE" : "#247158", // Change border color on focus
//                   },
//                 },
//               }}
//               InputLabelProps={{
//                 sx: {
//                   "&.Mui-focused": {
//                     color: darkMode ? "#CBE4DE" : "#247158", // Change label color on focus
//                   },
//                 },
//               }}
//             />
//           </Stack>
//           <TextField
//             variant="standard"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email"
//             name="email"
//             autoComplete="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             inputProps={{
//               style: {
//                 color: darkMode ? "#CBE4DE" : "#247158",
//               }, // Change text color
//             }}
//             InputProps={{
//               sx: {
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: darkMode ? "#CBE4DE" : "#247158", // Change border color on focus
//                 },
//               },
//             }}
//             InputLabelProps={{
//               sx: {
//                 "&.Mui-focused": {
//                   color: darkMode ? "#CBE4DE" : "#247158", // Change label color on focus
//                 },
//               },
//             }}
//           />
//           <TextField
//             variant="standard"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             inputProps={{
//               style: {
//                 color: darkMode ? "#CBE4DE" : "#247158",
//               }, // Change text color
//             }}
//             InputProps={{
//               sx: {
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: darkMode ? "#CBE4DE" : "#247158", // Change border color on focus
//                 },
//               },
//             }}
//             InputLabelProps={{
//               sx: {
//                 "&.Mui-focused": {
//                   color: darkMode ? "#CBE4DE" : "#247158", // Change label color on focus
//                 },
//               },
//             }}
//           />
//           <TextField
//             variant="standard"
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             autoComplete="current-password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             inputProps={{
//               style: {
//                 color: darkMode ? "#CBE4DE" : "#247158",
//               }, // Change text color
//             }}
//             InputProps={{
//               sx: {
//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: darkMode ? "#CBE4DE" : "#247158", // Change border color on focus
//                 },
//               },
//             }}
//             InputLabelProps={{
//               sx: {
//                 "&.Mui-focused": {
//                   color: darkMode ? "#CBE4DE" : "#247158", // Change label color on focus
//                 },
//               },
//             }}
//           />
//           <Stack direction="row" spacing={2}>
//             <TextField
//               id="outlined-basic"
//               select
//               label="Role"
//               variant="standard"
//               required
//               fullWidth
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               sx={{
//                 textAlign: "left",
//               }}
//               inputProps={{
//                 style: {
//                   color: darkMode ? "#CBE4DE" : "#247158",
//                 },
//               }}
//               InputProps={{
//                 sx: {
//                   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                     borderColor: darkMode ? "#CBE4DE" : "#247158",
//                   },
//                 },
//               }}
//               InputLabelProps={{
//                 sx: {
//                   "&.Mui-focused": {
//                     color: darkMode ? "#CBE4DE" : "#247158",
//                   },
//                 },
//               }}
//             >
//               {roles.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Stack>
//           <Button
//             type="button"
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 3,
//               //   mb: 2,
//               backgroundColor: darkMode ? "#0E8388" : "#186049",
//               "&:hover": {
//                 backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
//                 color: darkMode ? "#CBE4DE" : undefined,
//               },
//               borderRadius: 28,
//             }}
//             onClick={handleRegister}
//           >
//             Register
//           </Button>
//         </Box>
//       </Stack>
//     </Box>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useAppStore } from "../../appStore";

export default function Register({ closeEvent }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const rows = useAppStore((state) => state.rows);
  const setRows = useAppStore((state) => state.setRows);
  const navigate = useNavigate();
  const roles = [
    { value: "admin", label: "Admin" },
    { value: "waiter", label: "Waiter" },
    { value: "barista", label: "Barista" },
    { value: "kitchen", label: "Kitchen" },
    { value: "cashier", label: "Cashier" },
  ];

  const darkMode = useAppStore((state) => state.darkMode);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const username = firstName;

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/register",
        {
          username,
          firstName,
          lastName,
          password,
          role,
        }
      );

      setRows([...rows, response.data]);

      const { message, status } = response.data;

      if (status === 201) {
        setMessage(message);
        setSnackbarOpen(true);
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
      } else {
        setMessage(message);
        setSnackbarOpen(true);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        console.error("Error:", error.message);
        setError("An error occurred. Please try again.");
      }
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setError("");
    setMessage("");
  };

  return (
    <Box
      sx={{
        width: "500px",
        margin: "30px auto",
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
          Add User
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Stack direction="row" spacing={2}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          </Stack>
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
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Stack direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              select
              label="Role"
              variant="standard"
              required
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{
                textAlign: "left",
              }}
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
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          {/* <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
          /> */}
          <Button
            onClick={handleRegister}
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: darkMode ? "#395B64" : "#247158",
              "&:hover": {
                backgroundColor: darkMode ? "#628083" : "#5E8B7E",
              },
            }}
            disabled={loading}
          >
            Register
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
