import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import NavBar from "../components/NavBar";
import TableSelection from "../components/TableSelection";
import {
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
  Spacer,
} from "@mui/material";
import { tables as initialTables } from "../data/mockData"; // Import mockData
import { useAppStore } from "../appStore";

const CashierDashboard = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([...initialTables]); // Use mockData for tables

  const { darkMode, setDarkMode } = useAppStore();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#186049" : "#186049",
      },
      background: {
        default: darkMode ? "#2C3333" : "#f4f6f8",
        paper: darkMode ? "#2C3333" : "#ffffff",
      },
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId);
  };

  const handleBackToTableSelection = () => {
    setSelectedTable(null);
  };

  const handleGenerateBill = (tableId) => {
    const table = tableData.find((table) => table.id === tableId);

    if (table && table.status === "Occupied" && table.orders.length > 0) {
      // Logic to generate bill here
      alert(
        `Generating bill for table ${tableId}: ${JSON.stringify(table.orders)}`
      );
    } else {
      alert("No orders to generate a bill for this table.");
    }
  };

  return (
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={3}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
                >
                  {selectedTable ? `Table ${selectedTable}` : "Table Selection"}
                </Typography>
                {selectedTable && (
                  <Button
                    variant="contained"
                    sx={{
                      marginRight: "10px",
                      backgroundColor: darkMode ? "#0E8388" : "#186049",
                      "&:hover": {
                        backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
                        color: darkMode ? "#CBE4DE" : undefined,
                      },
                    }}
                  >
                    Generate Bill
                  </Button>
                )}
              </Stack>
              <TableSelection
                tables={tableData}
                selectedTable={selectedTable}
                onTableSelect={handleTableSelect}
                onFinishTable={handleGenerateBill}
              />
            </Grid>
          </Grid>
          {selectedTable && (
            <Button
              variant="contained"
              onClick={handleBackToTableSelection}
              sx={{
                marginTop: "20px",
                backgroundColor: darkMode ? "#0E8388" : "#186049",
                "&:hover": {
                  backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
                  color: darkMode ? "#CBE4DE" : undefined,
                },
              }}
            >
              Back to Table Selection
            </Button>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CashierDashboard;
