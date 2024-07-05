// // import React, { useState, useEffect } from "react";
// // import Sidenav from "../components/Sidenav";
// // import NavBar from "../components/NavBar";
// // import {
// //   Card,
// //   CardContent,
// //   Typography,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   createTheme,
// //   ThemeProvider,
// //   Box,
// //   Grid,
// //   Divider,
// //   Button,
// // } from "@mui/material";
// // import { initialKitchenOrders } from "../data/mockData";
// // import { useAppStore } from "../appStore";

// // const KitchenDashboard = () => {
// //   const { darkMode, setDarkMode } = useAppStore();

// //   const theme = createTheme({
// //     palette: {
// //       mode: darkMode ? "dark" : "light",
// //       primary: {
// //         main: darkMode ? "#186049" : "#186049",
// //       },
// //       background: {
// //         default: darkMode ? "#2C3333" : "#f4f6f8",
// //         paper: darkMode ? "#2C3333" : "#ffffff",
// //       },
// //     },
// //   });

// //   const [kitchenOrders, setKitchenOrders] = useState(() => {
// //     const savedKitchenOrders = localStorage.getItem("kitchenOrders");
// //     return savedKitchenOrders ? JSON.parse(savedKitchenOrders) : [];
// //   });

// //   useEffect(() => {
// //     // Save kitchenOrders to local storage whenever it changes
// //     localStorage.setItem("kitchenOrders", JSON.stringify(kitchenOrders));
// //   }, [kitchenOrders]);

// //   // if the user wants to remove or set done to all orders
// //   // const handleOrderDone = (orderIndex) => {
// //   //   // Remove the order from kitchenOrders array
// //   //   const updatedOrders = [...kitchenOrders];
// //   //   updatedOrders.splice(orderIndex, 1); // Remove the order at index orderIndex
// //   //   setKitchenOrders(updatedOrders);
// //   // };

// //   const handleItemDone = (orderIndex, itemIndex) => {
// //     // Create a copy of kitchenOrders to modify
// //     const updatedOrders = [...kitchenOrders];

// //     // Remove the specific item from the order's items array
// //     updatedOrders[orderIndex].items.splice(itemIndex, 1);

// //     // Check if there are no more items in the order
// //     if (updatedOrders[orderIndex].items.length === 0) {
// //       // Remove the entire order if it has no items left
// //       updatedOrders.splice(orderIndex, 1);
// //     }

// //     // Update kitchenOrders state with the modified copy
// //     setKitchenOrders(updatedOrders);
// //   };

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
// //       <Box height={70} />
// //       <Box sx={{ display: "flex" }}>
// //         <Sidenav darkMode={darkMode} />
// //         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
// //           <Typography
// //             variant="h4"
// //             gutterBottom
// //             sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
// //           >
// //             Kitchen Orders
// //           </Typography>
// //           <Grid container spacing={3}>
// //             {kitchenOrders.length === 0 ? (
// //               <Grid item xs={12}>
// //                 <Typography
// //                   variant="h6"
// //                   sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
// //                 >
// //                   No orders yet.
// //                 </Typography>
// //               </Grid>
// //             ) : (
// //               kitchenOrders.map((order, orderIndex) => (
// //                 <Grid item xs={12} sm={6} md={4} lg={3} key={orderIndex}>
// //                   <Card sx={{ marginBottom: 2 }}>
// //                     <CardContent>
// //                       <Typography variant="h6">
// //                         Table {order.tableId}
// //                       </Typography>
// //                       <Divider />
// //                       <List>
// //                         {order.items.map((item, itemIndex) => (
// //                           <ListItem key={itemIndex}>
// //                             <ListItemText
// //                               primary={`${item.name} x${item.quantity}`}
// //                             />
// //                             <Button
// //                               variant="contained"
// //                               color="success"
// //                               onClick={() =>
// //                                 // handleOrderDone(orderIndex, itemIndex)
// //                                 handleItemDone(orderIndex, itemIndex)
// //                               }
// //                               sx={{
// //                                 marginLeft: "10px",
// //                                 backgroundColor: darkMode
// //                                   ? "#0E8388"
// //                                   : "#186049",
// //                                 "&:hover": {
// //                                   backgroundColor: darkMode
// //                                     ? "#2E4F4F"
// //                                     : "#95877A",
// //                                   color: darkMode ? "#CBE4DE" : undefined,
// //                                 },
// //                               }}
// //                             >
// //                               Done
// //                             </Button>
// //                           </ListItem>
// //                         ))}
// //                       </List>
// //                     </CardContent>
// //                   </Card>
// //                 </Grid>
// //               ))
// //             )}
// //           </Grid>
// //         </Box>
// //       </Box>
// //     </ThemeProvider>
// //   );
// // };

// // export default KitchenDashboard;

// import React, { useState, useEffect } from "react";
// import Sidenav from "../components/Sidenav";
// import NavBar from "../components/NavBar";
// import {
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   createTheme,
//   ThemeProvider,
//   Box,
//   Grid,
//   Divider,
//   Button,
// } from "@mui/material";
// import axios from "axios";
// import { useAppStore } from "../appStore";

// const KitchenDashboard = () => {
//   const { darkMode, setDarkMode } = useAppStore();

//   const theme = createTheme({
//     palette: {
//       mode: darkMode ? "dark" : "light",
//       primary: {
//         main: darkMode ? "#186049" : "#186049",
//       },
//       background: {
//         default: darkMode ? "#2C3333" : "#f4f6f8",
//         paper: darkMode ? "#2C3333" : "#ffffff",
//       },
//     },
//   });

//   const [kitchenOrders, setKitchenOrders] = useState([]);

//   useEffect(() => {
//     const fetchKitchenOrders = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/api/orders`
//         );
//         setKitchenOrders(response.data);
//       } catch (error) {
//         console.error("Error fetching kitchen orders:", error);
//       }
//     };

//     fetchKitchenOrders();

//     const interval = setInterval(fetchKitchenOrders, 5000); // Fetch orders every 5 seconds
//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   const handleItemDone = async (orderIndex, itemIndex) => {
//     const updatedOrders = [...kitchenOrders];
//     const orderId = updatedOrders[orderIndex]._id;
//     const itemId = updatedOrders[orderIndex].items[itemIndex]._id;

//     try {
//       await axios.patch(
//         `${process.env.REACT_APP_BASE_URL}/api/orders/${orderId}/items/${itemId}/done`
//       );

//       updatedOrders[orderIndex].items.splice(itemIndex, 1);

//       if (updatedOrders[orderIndex].items.length === 0) {
//         updatedOrders.splice(orderIndex, 1);
//       }

//       setKitchenOrders(updatedOrders);
//     } catch (error) {
//       console.error("Error marking item as done:", error);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
//       <Box height={70} />
//       <Box sx={{ display: "flex" }}>
//         <Sidenav darkMode={darkMode} />
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Typography
//             variant="h4"
//             gutterBottom
//             sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
//           >
//             Kitchen Orders
//           </Typography>
//           <Grid container spacing={3}>
//             {kitchenOrders.length === 0 ? (
//               <Grid item xs={12}>
//                 <Typography
//                   variant="h6"
//                   sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
//                 >
//                   No orders yet.
//                 </Typography>
//               </Grid>
//             ) : (
//               kitchenOrders.map((order, orderIndex) => (
//                 <Grid item xs={12} sm={6} md={4} lg={3} key={orderIndex}>
//                   <Card sx={{ marginBottom: 2 }}>
//                     <CardContent>
//                       <Typography variant="h6">
//                         Table {order.tableId}
//                       </Typography>
//                       <Divider />
//                       <List>
//                         {order.items.map((item, itemIndex) => (
//                           <ListItem key={itemIndex}>
//                             <ListItemText
//                               primary={`${item.name} x${item.quantity}`}
//                             />
//                             <Button
//                               variant="contained"
//                               color="success"
//                               onClick={() =>
//                                 handleItemDone(orderIndex, itemIndex)
//                               }
//                               sx={{
//                                 marginLeft: "10px",
//                                 backgroundColor: darkMode
//                                   ? "#0E8388"
//                                   : "#186049",
//                                 "&:hover": {
//                                   backgroundColor: darkMode
//                                     ? "#2E4F4F"
//                                     : "#95877A",
//                                   color: darkMode ? "#CBE4DE" : undefined,
//                                 },
//                               }}
//                             >
//                               Done
//                             </Button>
//                           </ListItem>
//                         ))}
//                       </List>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))
//             )}
//           </Grid>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default KitchenDashboard;

//***********************************Working kitchen********************************** */

import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import NavBar from "../components/NavBar";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  createTheme,
  ThemeProvider,
  Box,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import axios from "axios";
import { useAppStore } from "../appStore";

const KitchenDashboard = () => {
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

  const [kitchenOrders, setKitchenOrders] = useState([]);

  useEffect(() => {
    const fetchKitchenOrders = async () => {
      const token=localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/orders`,{
            headers:{
              'Authorization': `Bearer ${token}`, // Ensure there are no extra spaces
            }
          }

        );

        // Filter orders to only include items with the "Pizza" category
        const filteredOrders = response.data
          .map((order) => ({
            ...order,
            items: order.items.filter((item) => item.category === "Pizza"),
          }))
          .filter((order) => order.items.length > 0); // Remove orders with no Pizza items

        setKitchenOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching kitchen orders:", error);
      }
    };

    fetchKitchenOrders();

    const interval = setInterval(fetchKitchenOrders, 5000); // Fetch orders every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);


  const handleItemDone = async (orderIndex, itemIndex) => {
    const updatedOrders = [...kitchenOrders];
    const orderId = updatedOrders[orderIndex]._id;
    const itemId = updatedOrders[orderIndex].items[itemIndex]._id;

    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/api/orders/${orderId}/items/${itemId}/done`
      );

      updatedOrders[orderIndex].items.splice(itemIndex, 1);

      if (updatedOrders[orderIndex].items.length === 0) {
        updatedOrders.splice(orderIndex, 1);
      }

      setKitchenOrders(updatedOrders);
    } catch (error) {
      console.error("Error marking item as done:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav darkMode={darkMode} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
          >
            Kitchen Orders
          </Typography>
          <Grid container spacing={3}>
            {kitchenOrders.length === 0 ? (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
                >
                  No orders yet.
                </Typography>
              </Grid>
            ) : (
              kitchenOrders.map((order, orderIndex) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={orderIndex}>
                  <Card sx={{ marginBottom: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{order.table.name}</Typography>
                      <Divider />
                      <List>
                        {order.items.map((item, itemIndex) => (
                          <ListItem key={itemIndex}>
                            <ListItemText
                              primary={`${item.name} x${item.quantity}`}
                            />
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() =>
                                handleItemDone(orderIndex, itemIndex)
                              }
                              sx={{
                                marginLeft: "10px",
                                backgroundColor: darkMode
                                  ? "#0E8388"
                                  : "#186049",
                                "&:hover": {
                                  backgroundColor: darkMode
                                    ? "#2E4F4F"
                                    : "#95877A",
                                  color: darkMode ? "#CBE4DE" : undefined,
                                },
                              }}
                            >
                              Done
                            </Button>
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default KitchenDashboard;
