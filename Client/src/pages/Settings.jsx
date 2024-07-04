import React from "react";
import Sidenav from "../components/Sidenav";
import NavBar from "../components/NavBar";
import Lists from "./settings/Lists";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { useAppStore } from "../appStore";

export default function Settings() {
  const { darkMode, setDarkMode } = useAppStore();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#186049" : "#186049",
      },
      background: {
        default: darkMode ? "#2C3333" : "#f4f6f8", //backgroundColor: darkMode ? "#00003f" : undefined,
        paper: darkMode ? "#2C3333" : "#ffffff",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Box height={70} />
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Sidenav darkMode={darkMode} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
            }}
          >
            <Lists darkMode={darkMode} />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
