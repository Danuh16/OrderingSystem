// import React, { useState, useEffect } from "react";
// import Sidenav from "../components/Sidenav";
// import NavBar from "../components/NavBar";
// import {
//   Container,
//   Typography,
//   Grid,
//   createTheme,
//   ThemeProvider,
//   Box,
//   Button,
//   useMediaQuery,
// } from "@mui/material";
// import CategoryList from "../components/CategoryList";
// import ItemList from "../components/ItemList";
// import SelectedItemsSidebar from "../components/SelectedItemsSidebar";
// import TableSelection from "../components/TableSelection";
// import {
//   categories,
//   tables as initialTables,
//   initialKitchenOrders,
//   initialBaristaOrders,
// } from "../data/mockData"; // Import mockData
// import { useAppStore } from "../appStore";
// import axios from "axios";

// const WaiterDashboard = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedTable, setSelectedTable] = useState(null);

//   const [tableData, setTableData] = useState([...initialTables]); // Use mockData for tables ...initialTables

//   // const [kitchenOrders, setKitchenOrders] = useState([]);
//   // const [baristaOrders, setBaristaOrders] = useState([]);

//   const [kitchenOrders, setKitchenOrders] = useState(() => {
//     const savedKitchenOrders = localStorage.getItem("kitchenOrders");
//     return savedKitchenOrders ? JSON.parse(savedKitchenOrders) : [];
//   });
//   const [baristaOrders, setBaristaOrders] = useState(() => {
//     const savedBaristaOrders = localStorage.getItem("baristaOrders");
//     return savedBaristaOrders ? JSON.parse(savedBaristaOrders) : [];
//   });

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

//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axios.get("/api/tables");
//         setTableData(response.data);
//       } catch (error) {
//         console.error("Error fetching tables:", error);
//       }
//     };

//     fetchTables();
//   }, []);

//   // useEffect(() => {
//   //   // Load table data from local storage on component mount
//   //   const storedTableData = JSON.parse(localStorage.getItem("tableData"));
//   //   if (storedTableData) {
//   //     setTableData(storedTableData);
//   //   } else {
//   //     setTableData([...initialTables]); // //Fallback to initial data if nothing is stored
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   // Save table data to local storage whenever it changes
//   //   localStorage.setItem("tableData", JSON.stringify(tableData));
//   // }, [tableData]);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleAddItem = (item) => {
//     setSelectedItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id);
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prevItems, { ...item, quantity: 1 }];
//     });
//   };

//   useEffect(() => {
//     localStorage.setItem("kitchenOrders", JSON.stringify(kitchenOrders));
//   }, [kitchenOrders]);

//   useEffect(() => {
//     localStorage.setItem("baristaOrders", JSON.stringify(baristaOrders));
//   }, [baristaOrders]);

//   const handleSendToKitchen = () => {
//     if (!selectedTable) {
//       alert("Please select a table before sending the order to the kitchen.");
//       return;
//     }

//     if (selectedItems.length === 0) {
//       alert("Please add items to the order before sending to the kitchen.");
//       return;
//     }

//     // Filter items by category
//     const kitchenItems = selectedItems.filter(
//       (item) => item.category === "Pizza"
//     );
//     const baristaItems = selectedItems.filter(
//       (item) => item.category === "Hot Drinks"
//     );

//     // Update the table data to reflect the new status and orders
//     const updatedTables = tableData.map((table) =>
//       table.id === selectedTable
//         ? {
//             ...table,
//             status: "Occupied",
//             orders: [...(table.orders || []), ...selectedItems],
//           }
//         : table
//     );

//     setTableData(updatedTables);

//     // Update kitchen orders
//     if (kitchenItems.length > 0) {
//       setKitchenOrders((prevOrders) => [
//         ...prevOrders,
//         {
//           tableId: selectedTable,
//           items: kitchenItems,
//         },
//       ]);
//     }

//     // Update barista orders
//     if (baristaItems.length > 0) {
//       setBaristaOrders((prevOrders) => [
//         ...prevOrders,
//         {
//           tableId: selectedTable,
//           items: baristaItems,
//         },
//       ]);
//     }

//     // Clear the selected items and reset the selected table
//     setSelectedItems([]);
//     setSelectedTable(null); // Assuming you want to deselect the table after sending orders
//   };

//   const handleTableSelect = (tableId) => {
//     setSelectedTable(tableId);

//     // Load orders for the selected table
//     const table = tableData.find((table) => table.id === tableId);
//     setSelectedItems(table.orders || []);
//   };

//   const handleBackToTableSelection = () => {
//     setSelectedTable(null);
//     setSelectedCategory(null);
//     setSelectedItems([]);
//   };

//   const handleDecrementItem = (itemId) => {
//     setSelectedItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const handleDiscardItem = (itemId) => {
//     setSelectedItems((prevItems) =>
//       prevItems.filter((item) => item.id !== itemId)
//     );
//   };

//   const handleSendToCashier = (tableId, orders) => {
//     // Simulate sending orders to the cashier
//     alert(`Sending orders from table ${tableId} to cashier:`, orders);

//     // Here you can add any logic needed to actually send the orders to the cashier
//     // This could be an API call or some other logic depending on your backend
//   };

//   const handleFinishTable = (tableId) => {
//     // Find the table with the given ID
//     const table = tableData.find((table) => table.id === tableId);

//     if (table && table.orders.length > 0) {
//       // Send orders to the cashier before clearing them
//       handleSendToCashier(tableId, table.orders);

//       // Update the table data to set status to 'Vacant' and clear orders
//       const updatedTables = tableData.map((table) =>
//         table.id === tableId
//           ? {
//               ...table,
//               status: "Vacant",
//               orders: [],
//             }
//           : table
//       );

//       // Update the tableData state with updatedTables
//       setTableData(updatedTables);

//       // Clear the selected items and reset the selected table
//       setSelectedItems([]);
//       setSelectedTable(null); // Assuming you want to deselect the table after finishing
//     } else {
//       alert("No orders to send to cashier.");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
//       <Box height={70} />
//       <Box
//         sx={{
//           display: "flex",
//         }}
//       >
//         <Sidenav darkMode={darkMode} />
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//           }}
//         >
//           {selectedTable ? (
//             <Grid container spacing={3}>
//               <Grid item xs={12} display="flex" justifyContent="space-between">
//                 <Typography
//                   variant="h5"
//                   sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
//                 >
//                   Selected Table:{" "}
//                   {tableData.find((table) => table.id === selectedTable)?.name}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={handleBackToTableSelection}
//                   sx={{
//                     marginRight: "10px",
//                     backgroundColor: darkMode ? "#0E8388" : "#186049",
//                     "&:hover": {
//                       backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
//                       color: darkMode ? "#CBE4DE" : undefined,
//                     },
//                   }}
//                 >
//                   Change Table
//                 </Button>
//               </Grid>
//               <Grid item xs={12}>
//                 <CategoryList
//                   categories={categories}
//                   onCategoryClick={handleCategoryClick}
//                 />
//               </Grid>
//               <Grid item xs={12} md={9}>
//                 {selectedCategory && (
//                   <ItemList
//                     items={selectedCategory.items}
//                     onAddItem={handleAddItem}
//                   />
//                 )}
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <SelectedItemsSidebar
//                   selectedItems={selectedItems}
//                   onSendToKitchen={handleSendToKitchen}
//                   onDecrementItem={handleDecrementItem}
//                   onDiscardItem={handleDiscardItem}
//                   onRemoveItem={() => setSelectedItems([])} // Clear selected items on finish
//                 />
//               </Grid>
//             </Grid>
//           ) : (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TableSelection
//                   tables={tableData}
//                   selectedTable={selectedTable}
//                   onTableSelect={handleTableSelect}
//                   onFinishTable={handleFinishTable}
//                 />
//               </Grid>
//             </Grid>
//           )}
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default WaiterDashboard;

// import React, { useState, useEffect } from "react";
// import Sidenav from "../components/Sidenav";
// import NavBar from "../components/NavBar";
// import {
//   Container,
//   Typography,
//   Grid,
//   createTheme,
//   ThemeProvider,
//   Box,
//   Button,
//   useMediaQuery,
// } from "@mui/material";
// import CategoryList from "../components/CategoryList";
// import ItemList from "../components/ItemList";
// import SelectedItemsSidebar from "../components/SelectedItemsSidebar";
// import TableSelection from "../components/TableSelection";
// import { categories } from "../data/mockData"; // Import mockData
// import { useAppStore } from "../appStore";
// import axios from "axios";

// const WaiterDashboard = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedTable, setSelectedTable] = useState(null);

//   const [tableData, setTableData] = useState([]);

//   const [kitchenOrders, setKitchenOrders] = useState([]);
//   const [baristaOrders, setBaristaOrders] = useState([]);

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

//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // useEffect(() => {
//   //   const fetchTables = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         process.env.REACT_APP_BASE_URL + "/api/tables"
//   //       );
//   //       setTableData(response.data);
//   //     } catch (error) {
//   //       console.error("Error fetching tables:", error);
//   //     }
//   //   };

//   //   fetchTables();
//   // }, []);

//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axios.get(
//           process.env.REACT_APP_BASE_URL + "/api/tables"
//         );
//         console.log("Fetched tables:", response.data); // Log the fetched tables
//         setTableData(response.data);
//       } catch (error) {
//         console.error("Error fetching tables:", error);
//       }
//     };

//     fetchTables();
//   }, []);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleAddItem = (item) => {
//     setSelectedItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id);
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prevItems, { ...item, quantity: 1 }];
//     });
//   };

//   const handleSendToKitchen = async () => {
//     if (!selectedTable) {
//       alert("Please select a table before sending the order to the kitchen.");
//       return;
//     }

//     if (selectedItems.length === 0) {
//       alert("Please add items to the order before sending to the kitchen.");
//       return;
//     }

//     // Filter items by category
//     const kitchenItems = selectedItems.filter(
//       (item) => item.category === "Pizza"
//     );
//     const baristaItems = selectedItems.filter(
//       (item) => item.category === "Hot Drinks"
//     );

//     // Create new order
//     const newOrder = {
//       table: selectedTable,
//       items: selectedItems,
//       total: selectedItems.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//       ),
//     };

//     try {
//       const response = await axios.post(
//         process.env.REACT_APP_BASE_URL + "/api/orders",
//         newOrder
//       );
//       const createdOrder = response.data;

//       // Update the table data to reflect the new status and orders
//       const updatedTables = tableData.map((table) =>
//         table._id === selectedTable
//           ? {
//               ...table,
//               status: "Occupied",
//               orders: [...(table.orders || []), createdOrder],
//             }
//           : table
//       );

//       setTableData(updatedTables);

//       // Update kitchen orders
//       if (kitchenItems.length > 0) {
//         setKitchenOrders((prevOrders) => [
//           ...prevOrders,
//           {
//             tableId: selectedTable,
//             items: kitchenItems,
//           },
//         ]);
//       }

//       // Update barista orders
//       if (baristaItems.length > 0) {
//         setBaristaOrders((prevOrders) => [
//           ...prevOrders,
//           {
//             tableId: selectedTable,
//             items: baristaItems,
//           },
//         ]);
//       }

//       // Clear the selected items and reset the selected table
//       setSelectedItems([]);
//       setSelectedTable(null);
//     } catch (error) {
//       console.error("Error creating order:", error);
//     }
//   };

//   // const handleTableSelect = (tableId) => {
//   //   setSelectedTable(tableId);

//   //   // Load orders for the selected table
//   //   const table = tableData.find((table) => table._id === tableId);
//   //   setSelectedItems(table.orders || []);
//   // };

//   // **********************************************************************************

//   const handleTableSelect = (tableId) => {
//     setSelectedTable(tableId);

//     // Load orders for the selected table
//     const table = tableData.find((table) => table._id === tableId);

//     if (table) {
//       setSelectedItems(table.orders || []);
//     } else {
//       console.error(`Table with ID ${tableId} not found`);
//     }
//   };

//   const handleBackToTableSelection = () => {
//     setSelectedTable(null);
//     setSelectedCategory(null);
//     setSelectedItems([]);
//   };

//   const handleDecrementItem = (itemId) => {
//     setSelectedItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const handleDiscardItem = (itemId) => {
//     setSelectedItems((prevItems) =>
//       prevItems.filter((item) => item.id !== itemId)
//     );
//   };

//   const handleSendToCashier = (tableId, orders) => {
//     // Simulate sending orders to the cashier
//     alert(`Sending orders from table ${tableId} to cashier:`, orders);

//     // Here you can add any logic needed to actually send the orders to the cashier
//     // This could be an API call or some other logic depending on your backend
//   };

//   const handleFinishTable = async (tableId) => {
//     // Find the table with the given ID
//     const table = tableData.find((table) => table._id === tableId);

//     if (table && table.orders.length > 0) {
//       // Send orders to the cashier before clearing them
//       handleSendToCashier(tableId, table.orders);

//       try {
//         // Update the table status to 'Vacant' and clear orders in the backend
//         await axios.put(`/api/tables/${tableId}`, {
//           status: "Vacant",
//           orders: [],
//         });

//         // Update the table data to set status to 'Vacant' and clear orders
//         const updatedTables = tableData.map((table) =>
//           table._id === tableId
//             ? {
//                 ...table,
//                 status: "Vacant",
//                 orders: [],
//               }
//             : table
//         );

//         setTableData(updatedTables);

//         // Clear the selected items and reset the selected table
//         setSelectedItems([]);
//         setSelectedTable(null);
//       } catch (error) {
//         console.error("Error updating table status:", error);
//       }
//     } else {
//       alert("No orders to send to cashier.");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
//       <Box height={70} />
//       <Box
//         sx={{
//           display: "flex",
//         }}
//       >
//         <Sidenav darkMode={darkMode} />
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//           }}
//         >
//           {selectedTable ? (
//             <Grid container spacing={3}>
//               <Grid item xs={12} display="flex" justifyContent="space-between">
//                 <Typography
//                   variant="h5"
//                   sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
//                 >
//                   Selected Table:{" "}
//                   {tableData.find((table) => table._id === selectedTable)?.name}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={handleBackToTableSelection}
//                   sx={{
//                     marginRight: "10px",
//                     backgroundColor: darkMode ? "#0E8388" : "#186049",
//                     "&:hover": {
//                       backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
//                       color: darkMode ? "#CBE4DE" : undefined,
//                     },
//                   }}
//                 >
//                   Change Table
//                 </Button>
//               </Grid>
//               <Grid item xs={12}>
//                 <CategoryList
//                   categories={categories}
//                   onCategoryClick={handleCategoryClick}
//                 />
//               </Grid>
//               <Grid item xs={12} md={9}>
//                 {selectedCategory && (
//                   <ItemList
//                     items={selectedCategory.items}
//                     onAddItem={handleAddItem}
//                   />
//                 )}
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <SelectedItemsSidebar
//                   selectedItems={selectedItems}
//                   onSendToKitchen={handleSendToKitchen}
//                   onDecrementItem={handleDecrementItem}
//                   onDiscardItem={handleDiscardItem}
//                   onRemoveItem={() => setSelectedItems([])} // Clear selected items on finish
//                 />
//               </Grid>
//             </Grid>
//           ) : (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TableSelection
//                   tables={tableData}
//                   selectedTable={selectedTable}
//                   onTableSelect={handleTableSelect}
//                   onFinishTable={handleFinishTable}
//                 />
//               </Grid>
//             </Grid>
//           )}
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default WaiterDashboard;

//********************************************************************************* */
import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import NavBar from "../components/NavBar";
import {
  Container,
  Typography,
  Grid,
  createTheme,
  ThemeProvider,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import CategoryList from "../components/CategoryList";
import ItemList from "../components/ItemList";
import SelectedItemsSidebar from "../components/SelectedItemsSidebar";
import TableSelection from "../components/TableSelection";
import { categories } from "../data/mockData"; // Import mockData
import { useAppStore } from "../appStore";
import axios from "axios";

const WaiterDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  const [tableData, setTableData] = useState([]);

  const [kitchenOrders, setKitchenOrders] = useState([]);
  const [baristaOrders, setBaristaOrders] = useState([]);

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

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "/api/tables"
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    fetchTables();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddItem = (item) => {
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleSendToKitchen = async () => {
    if (!selectedTable) {
      alert("Please select a table before sending the order to the kitchen.");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Please add items to the order before sending to the kitchen.");
      return;
    }

    // Filter items by category
    const kitchenItems = selectedItems.filter(
      (item) => item.category === "Pizza"
    );
    const baristaItems = selectedItems.filter(
      (item) => item.category === "Hot Drinks"
    );

    // Create new order
    const newOrder = {
      table: selectedTable,
      items: selectedItems,
      total: selectedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/orders",
        newOrder
      );
      const createdOrder = response.data;

      // Update the table data to reflect the new status and orders
      const updatedTables = tableData.map((table) =>
        table._id === selectedTable
          ? {
              ...table,
              status: "Occupied",
              orders: [...(table.status || []), createdOrder],
            }
          : table
      );

      setTableData(updatedTables);

      // Update kitchen orders
      if (kitchenItems.length > 0) {
        setKitchenOrders((prevOrders) => [
          ...prevOrders,
          {
            tableId: selectedTable,
            items: kitchenItems,
          },
        ]);
      }

      // Update barista orders
      if (baristaItems.length > 0) {
        setBaristaOrders((prevOrders) => [
          ...prevOrders,
          {
            tableId: selectedTable,
            items: baristaItems,
          },
        ]);
      }

      // Clear the selected items and reset the selected table
      setSelectedItems([]);
      setSelectedTable(null);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId);

    // Load orders for the selected table
    const table = tableData.find((table) => table._id === tableId);
    if (table) {
      setSelectedItems(table.orders || []);
    } else {
      console.error(`Table with ID ${tableId} not found`);
    }
  };

  const handleBackToTableSelection = () => {
    setSelectedTable(null);
    setSelectedCategory(null);
    setSelectedItems([]);
  };

  const handleDecrementItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDiscardItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleSendToCashier = (tableId, orders) => {
    // Simulate sending orders to the cashier
    alert(`Sending orders from table ${tableId} to cashier:`, orders);

    // Here you can add any logic needed to actually send the orders to the cashier
    // This could be an API call or some other logic depending on your backend
  };

  const handleFinishTable = async (tableId) => {
    // Find the table with the given ID
    const table = tableData.find((table) => table._id === tableId);

    if (table && table.orders.length > 0) {
      // Send orders to the cashier before clearing them
      handleSendToCashier(tableId, table.orders);

      try {
        // Update the table status to 'Vacant' and clear orders in the backend
        await axios.put(`/api/tables/${tableId}`, {
          status: "Vacant",
          orders: [],
        });

        // Update the table data to set status to 'Vacant' and clear orders
        const updatedTables = tableData.map((table) =>
          table._id === tableId
            ? {
                ...table,
                status: "Vacant",
                orders: [],
              }
            : table
        );

        setTableData(updatedTables);

        // Clear the selected items and reset the selected table
        setSelectedItems([]);
        setSelectedTable(null);
      } catch (error) {
        console.error("Error updating table status:", error);
      }
    } else {
      alert("No orders to send to cashier.");
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
          {selectedTable ? (
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Typography
                  variant="h5"
                  sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
                >
                  Selected Table:{" "}
                  {tableData.find((table) => table._id === selectedTable)?.name}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleBackToTableSelection}
                  sx={{
                    marginRight: "10px",
                    backgroundColor: darkMode ? "#0E8388" : "#186049",
                    "&:hover": {
                      backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
                      color: darkMode ? "#CBE4DE" : undefined,
                    },
                  }}
                >
                  Change Table
                </Button>
              </Grid>
              <Grid item xs={12}>
                <CategoryList
                  categories={categories}
                  onCategoryClick={handleCategoryClick}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                {selectedCategory && (
                  <ItemList
                    items={selectedCategory.items}
                    onAddItem={handleAddItem}
                  />
                )}
              </Grid>
              <Grid item xs={12} md={3}>
                <SelectedItemsSidebar
                  selectedItems={selectedItems}
                  onSendToKitchen={handleSendToKitchen}
                  onDecrementItem={handleDecrementItem}
                  onDiscardItem={handleDiscardItem}
                />
              </Grid>
            </Grid>
          ) : (
            <TableSelection
              tables={tableData}
              selectedTable={selectedTable}
              onTableSelect={handleTableSelect}
              onFinishTable={handleFinishTable}
            />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WaiterDashboard;

//*********************************************Latest GPT Code******************************************************* */
// import React, { useState, useEffect } from "react";
// import Sidenav from "../components/Sidenav";
// import NavBar from "../components/NavBar";
// import {
//   Container,
//   Typography,
//   Grid,
//   createTheme,
//   ThemeProvider,
//   Box,
//   Button,
//   useMediaQuery,
// } from "@mui/material";
// import CategoryList from "../components/CategoryList";
// import ItemList from "../components/ItemList";
// import SelectedItemsSidebar from "../components/SelectedItemsSidebar";
// import TableSelection from "../components/TableSelection";
// import { categories } from "../data/mockData"; // Import mockData
// import { useAppStore } from "../appStore";
// import axios from "axios";

// const WaiterDashboard = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedTable, setSelectedTable] = useState(null);

//   const [tableData, setTableData] = useState([]);

//   const [kitchenOrders, setKitchenOrders] = useState([]);
//   const [baristaOrders, setBaristaOrders] = useState([]);

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

//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axios.get(
//           process.env.REACT_APP_BASE_URL + "/api/tables"
//         );
//         setTableData(response.data);
//       } catch (error) {
//         console.error("Error fetching tables:", error);
//       }
//     };

//     fetchTables();
//   }, []);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const handleAddItem = (item) => {
//     setSelectedItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id);
//       if (existingItem) {
//         return prevItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prevItems, { ...item, quantity: 1 }];
//     });
//   };

//   const handleSendToKitchen = async () => {
//     if (!selectedTable) {
//       alert("Please select a table before sending the order to the kitchen.");
//       return;
//     }

//     if (selectedItems.length === 0) {
//       alert("Please add items to the order before sending to the kitchen.");
//       return;
//     }

//     // Filter items by category
//     const kitchenItems = selectedItems.filter(
//       (item) => item.category === "Pizza"
//     );
//     const baristaItems = selectedItems.filter(
//       (item) => item.category === "Hot Drinks"
//     );

//     // Create new order
//     const newOrder = {
//       table: selectedTable,
//       items: selectedItems,
//       total: selectedItems.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//       ),
//     };

//     try {
//       const response = await axios.post(
//         process.env.REACT_APP_BASE_URL + "/api/orders",
//         newOrder
//       );
//       const createdOrder = response.data;

//       // Update the table data to reflect the new status and orders
//       const updatedTables = tableData.map((table) =>
//         table._id === selectedTable
//           ? {
//               ...table,
//               status: "Occupied",
//               orders: [...(table.orders || []), createdOrder],
//             }
//           : table
//       );

//       setTableData(updatedTables);

//       // Update kitchen orders
//       if (kitchenItems.length > 0) {
//         setKitchenOrders((prevOrders) => [
//           ...prevOrders,
//           {
//             tableId: selectedTable,
//             items: kitchenItems,
//           },
//         ]);
//       }

//       // Update barista orders
//       if (baristaItems.length > 0) {
//         setBaristaOrders((prevOrders) => [
//           ...prevOrders,
//           {
//             tableId: selectedTable,
//             items: baristaItems,
//           },
//         ]);
//       }

//       // Clear the selected items and reset the selected table
//       setSelectedItems([]);
//       setSelectedTable(null);
//     } catch (error) {
//       console.error("Error creating order:", error);
//     }
//   };

//   const handleTableSelect = (tableId) => {
//     setSelectedTable(tableId);

//     // Load orders for the selected table
//     const table = tableData.find((table) => table._id === tableId);
//     if (table) {
//       setSelectedItems(table.orders || []);
//     } else {
//       console.error(`Table with ID ${tableId} not found`);
//     }
//   };

//   const handleBackToTableSelection = () => {
//     setSelectedTable(null);
//     setSelectedCategory(null);
//     setSelectedItems([]);
//   };

//   const handleDecrementItem = (itemId) => {
//     setSelectedItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const handleDiscardItem = (itemId) => {
//     setSelectedItems((prevItems) =>
//       prevItems.filter((item) => item.id !== itemId)
//     );
//   };

//   const handleSendToCashier = (tableId, orders) => {
//     // Simulate sending orders to the cashier
//     alert(`Sending orders from table ${tableId} to cashier:`, orders);

//     // Here you can add any logic needed to actually send the orders to the cashier
//     // This could be an API call or some other logic depending on your backend
//   };

//   const handleFinishTable = async (tableId) => {
//     // Find the table with the given ID
//     const table = tableData.find((table) => table._id === tableId);

//     if (table && table.orders.length > 0) {
//       // Send orders to the cashier before clearing them
//       handleSendToCashier(tableId, table.orders);

//       try {
//         // Update the table status to 'Vacant' and clear orders in the backend
//         await axios.put(`/api/tables/${tableId}`, {
//           status: "Vacant",
//           orders: [],
//         });

//         // Update the table data to set status to 'Vacant' and clear orders
//         const updatedTables = tableData.map((table) =>
//           table._id === tableId
//             ? {
//                 ...table,
//                 status: "Vacant",
//                 orders: [],
//               }
//             : table
//         );

//         setTableData(updatedTables);

//         // Clear the selected items and reset the selected table
//         setSelectedItems([]);
//         setSelectedTable(null);
//       } catch (error) {
//         console.error("Error updating table status:", error);
//       }
//     } else {
//       alert("No orders to send to cashier.");
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
//       <Box height={70} />
//       <Box
//         sx={{
//           display: "flex",
//         }}
//       >
//         <Sidenav darkMode={darkMode} />
//         <Box
//           component="main"
//           sx={{
//             flexGrow: 1,
//             p: 3,
//           }}
//         >
//           {selectedTable ? (
//             <Grid container spacing={3}>
//               <Grid item xs={12} display="flex" justifyContent="space-between">
//                 <Typography
//                   variant="h5"
//                   sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
//                 >
//                   Selected Table:{" "}
//                   {tableData.find((table) => table._id === selectedTable)?.name}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   onClick={handleBackToTableSelection}
//                   sx={{
//                     marginRight: "10px",
//                     backgroundColor: darkMode ? "#0E8388" : "#186049",
//                     "&:hover": {
//                       backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
//                       color: darkMode ? "#CBE4DE" : undefined,
//                     },
//                   }}
//                 >
//                   Change Table
//                 </Button>
//               </Grid>
//               <Grid item xs={12}>
//                 <CategoryList
//                   categories={categories}
//                   onCategoryClick={handleCategoryClick}
//                 />
//               </Grid>
//               <Grid item xs={12} md={9}>
//                 {selectedCategory && (
//                   <ItemList
//                     items={selectedCategory.items}
//                     onAddItem={handleAddItem}
//                   />
//                 )}
//               </Grid>
//               <Grid item xs={12} md={3}>
//                 <SelectedItemsSidebar
//                   selectedItems={selectedItems}
//                   onSendToKitchen={handleSendToKitchen}
//                   onDecrementItem={handleDecrementItem}
//                   onDiscardItem={handleDiscardItem}
//                   onRemoveItem={() => setSelectedItems([])} // Clear selected items on finish
//                 />
//               </Grid>
//             </Grid>
//           ) : (
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TableSelection
//                   tableData={tableData}
//                   onTableSelect={handleTableSelect}
//                 />
//               </Grid>
//             </Grid>
//           )}
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default WaiterDashboard;
