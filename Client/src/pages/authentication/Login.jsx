// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Avatar,
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   FormControlLabel,
//   Grid,
//   TextField,
//   Typography,
//   createTheme,
//   ThemeProvider,
//   Snackbar,
// } from "@mui/material";
// import LoginIcon from "@mui/icons-material/Login";
// import axios from "axios"; // Import axios for API requests

// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";

// import { useAppStore } from "../../appStore"; // Make sure this path is correct

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     background: {
//       default: "#E4D5C7", // default: "#121212",
//       paper: "#247158", // Example value for paper background in dark mode paper: "#615EFC",
//     },
//   },
// });

// const boxStyle = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   padding: 4,
//   bgcolor: "background.paper",
//   boxShadow: "0 8px 16px rgb(0,0,0,0.3)",
//   borderRadius: 2,
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90%",
//   maxWidth: 400,
// };

// export default function Login({ onTabChange }) {
//   const [username, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   //const [remember, setRemember] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [submit, setSubmit] = useState(false); // New state to trigger useEffect
//   const [message, setMessage] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => setShowPassword(!showPassword);
//   const handleMouseDownPassword = (event) => event.preventDefault();

//   const remember = useAppStore((state) => state.remember);
//   const setRemember = useAppStore((state) => state.setRemember);
//   const storedUsername = useAppStore((state) => state.username);
//   const setUsername = useAppStore((state) => state.setUsername);
//   const storedPassword = useAppStore((state) => state.password);
//   const setStoredPassword = useAppStore((state) => state.setPassword);

//   useEffect(() => {
//     if (!submit) return; // Only run the effect if submit is true

//     const loginUser = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.post(
//           process.env.REACT_APP_BASE_URL + "/api/auth/login",
//           {
//             // http://localhost:5000
//             username,
//             password,
//           }
//         );
//         const data = response.data;

//         if (data.success == false) {
//           setMessage(data.message);
//           setSnackbarOpen(true);
//         } else {
//           // Save user data in local storage
//           window.localStorage.setItem("user", JSON.stringify(data));
//           if (remember) {
//             setUsername(username);
//             setStoredPassword(password);
//           }
//           // Navigate to user page or dashboard
//           navigate("/waiters");
//         }
//       } catch (error) {
//         if (error.response) {
//           // Server responded with a status other than 200 range
//           setError(error.response.data.message);
//         } else {
//           // Something else happened while setting up the request
//           console.error("Error:", error.message);
//           setError("An error occurred. Please try again.");
//         }
//         setSnackbarOpen(true);
//       } finally {
//         setLoading(false);
//         setSubmit(false); // Reset submit to false after the request completes
//       }
//     };

//     loginUser();
//   }, [submit, username, password, navigate]); // Effect runs when submit, email, or password changes

//   useEffect(() => {
//     if (remember) {
//       setUserName(storedUsername);
//       setPassword(storedPassword);
//     }
//   }, [remember, storedUsername, storedPassword]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setSubmit(true); // Set submit to true to trigger useEffect
//   };

//   const onForgotPasswordClick = () => {
//     onTabChange(1); // Change tab index to forgot password (index 2)
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//     setError("");
//     setMessage("");
//   };

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <div
//         style={{
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Container component="main" maxWidth="xs">
//           <Box sx={boxStyle}>
//             <Avatar
//               sx={{
//                 m: 1,
//                 backgroundColor: "#6AB29B",
//               }}
//             >
//               <LoginIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5" color="#ffffff">
//               Sign In
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               sx={{ mt: 1 }}
//               onSubmit={handleLogin}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="User Name"
//                 name="username"
//                 autoComplete="username"
//                 autoFocus
//                 value={username}
//                 onChange={(e) => setUserName(e.target.value)}
//               />

//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                       >
//                         {showPassword ? <Visibility /> : <VisibilityOff />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <FormControlLabel
//                 control={<Checkbox checked={remember} color="primary" />}
//                 label="Remember me"
//                 onClick={() => setRemember(!remember)}
//                 sx={{ color: "#ffffff" }}
//               />
//               {error && (
//                 <Snackbar
//                   open={snackbarOpen}
//                   autoHideDuration={5000}
//                   onClose={handleSnackbarClose}
//                   message={error}
//                   anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//                 />
//               )}
//               {message && (
//                 <Snackbar
//                   open={snackbarOpen}
//                   autoHideDuration={5000}
//                   onClose={handleSnackbarClose}
//                   message={message}
//                   anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//                 />
//               )}
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   backgroundColor: "#6AB29B",
//                   "&:hover": {
//                     backgroundColor: "#95877A",
//                   },
//                   color: "#ffffff",
//                   borderRadius: 28,
//                 }}
//                 disabled={loading} // Disable button during loading
//               >
//                 {loading ? "Signing In..." : "Sign In"}
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Typography
//                     variant="body2"
//                     color="#ffffff"
//                     onClick={onForgotPasswordClick}
//                     sx={{
//                       cursor: "pointer",
//                       textAlign: "center",
//                       mt: 2,
//                     }}
//                   >
//                     Forgot password?
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Container>
//       </div>
//     </ThemeProvider>
//   );
// }
//************************************************************************************************************** */
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
        `${process.env.REACT_APP_BASE_URL}/login`,
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
        // ... other cases
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
