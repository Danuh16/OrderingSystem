import React from "react";
import Sidenav from "../components/Sidenav";
import NavBar from "../components/NavBar";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import "../Dashboard.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccordionDashboard from "../components/AccordionDashboard";
import BarChart from "../charts/BarChart";
import CountUp from "react-countup";
import { useAppStore } from "../appStore";

export default function Home() {
  const darkMode = useAppStore((state) => state.darkMode);

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

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack spacing={2} direction={"row"}>
                <Card
                  sx={{
                    minWidth: "49%",
                    height: 150,
                    backgroundColor: darkMode ? "#2E4F4F" : "#186049",
                    color: darkMode ? "#CBE4DE" : "#ffffff",
                  }}
                >
                  <CardContent>
                    <CreditCardIcon
                      sx={{ color: darkMode ? "#CBE4DE" : "#ffffff" }}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                      $<CountUp end={500} duration={0.3} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      Total Earning
                    </Typography>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    minWidth: "49%",
                    height: 150,
                    backgroundColor: darkMode ? "#0E8388" : "#95877A",
                    color: darkMode ? "#CBE4DE" : "#ffffff",
                  }}
                >
                  <CardContent>
                    <CreditCardIcon
                      sx={{ color: darkMode ? "#CBE4DE" : "#ffffff" }}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                      $<CountUp end={900} />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      Total Order
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Card
                  sx={{
                    backgroundColor: darkMode ? "#2E4F4F" : "#186049",
                    color: darkMode ? "#CBE4DE" : "#ffffff",
                  }}
                >
                  <Stack spacing={2} direction={"row"}>
                    <div className="iconStyle">
                      <StorefrontIcon
                        sx={{ color: darkMode ? "#CBE4DE" : "#ffffff" }}
                      />
                    </div>
                    <div className="paddingAll">
                      <span className="priceTitle">$230k</span>
                      <br />
                      <span className="priceSubTitle">Total Income</span>
                    </div>
                  </Stack>
                </Card>

                <Card
                  sx={{
                    backgroundColor: darkMode ? "#2C3333" : "#f4f6f8",
                    color: darkMode ? "#CBE4DE" : "#186049",
                  }}
                >
                  <Stack spacing={2} direction={"row"}>
                    <div className="iconStyle">
                      <StorefrontIcon
                        sx={{ color: darkMode ? "#CBE4DE" : "#186049" }}
                      />
                    </div>
                    <div className="paddingAll">
                      <span className="priceTitle">$230k</span>
                      <br />
                      <span className="priceSubTitle">Total Income</span>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card
                sx={{
                  height: "60vh",
                  backgroundColor: darkMode ? "#2C3333" : "#f4f6f8",
                  color: darkMode ? "#CBE4DE" : "#186049",
                }}
              >
                {/* <CardContent>
                  <BarChart />
                </CardContent> */}
                <BarChart />
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card
                sx={{
                  height: "60vh",
                  backgroundColor: darkMode ? "#2C3333" : "#f4f6f8",
                  color: darkMode ? "#CBE4DE" : "#186049",
                }}
              >
                <CardContent>
                  <div className="paddingAll">
                    <span className="priceTitle">Popular Products</span>
                  </div>
                  <AccordionDashboard />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
