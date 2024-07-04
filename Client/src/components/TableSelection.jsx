// import React from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardActionArea,
//   Button,
// } from "@mui/material";
// import { useAppStore } from "../appStore";

// const TableSelection = ({
//   tables,
//   selectedTable,
//   onTableSelect,
//   onFinishTable,
// }) => {
//   const { darkMode, setDarkMode } = useAppStore();

//   const handleFinishTable = (tableId) => {
//     // Example notification handling (replace with actual implementation)
//     alert(`Notification sent to cashier for table ${tableId}`);

//     // Example logic to update table status and clear orders (replace with actual implementation)
//     const updatedTables = tables.map((table) =>
//       table.id === tableId ? { ...table, status: "Vacant", orders: [] } : table
//     );

//     // Example callback to update parent component state (replace with actual state management)
//     onFinishTable(updatedTables);
//   };
//   return (
//     <Box>
//       <Typography
//         variant="h5"
//         gutterBottom
//         sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
//       >
//         Select a Table
//       </Typography>
//       <Grid container spacing={2}>
//         {tables.map((table) => (
//           <Grid item xs={6} md={3} key={table.id}>
//             <Card
//               sx={{
//                 backgroundColor:
//                   table.status === "Occupied"
//                     ? darkMode
//                       ? "#A91D3A" // Dark mode color for occupied
//                       : "#FF6347" // Light mode color for occupied
//                     : darkMode
//                     ? "#186049" // Dark mode color for other statuses
//                     : "#6AB29B", // Light mode color for other statuses
//               }}
//             >
//               <CardActionArea onClick={() => onTableSelect(table.id)}>
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color:
//                         selectedTable === table.id
//                           ? darkMode
//                             ? "#CBE4DE"
//                             : "#247158"
//                           : darkMode
//                           ? "#CBE4DE"
//                           : "#151515",
//                     }}
//                   >
//                     {table.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color:
//                         selectedTable === table.id
//                           ? darkMode
//                             ? "#CBE4DE"
//                             : "#FFF5E1"
//                           : darkMode
//                           ? "#CBE4DE"
//                           : "#FFF5E1",
//                     }}
//                   >
//                     Status: {table.status}
//                   </Typography>
//                   {table.orders && table.orders.length > 0 && (
//                     <Box mt={1}>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color:
//                             selectedTable === table.id
//                               ? darkMode
//                                 ? "#CBE4DE"
//                                 : "#FFF5E1"
//                               : darkMode
//                               ? "#CBE4DE"
//                               : "#FFF5E1",
//                         }}
//                       >
//                         Orders:
//                       </Typography>
//                       {table.orders.map((order, index) => (
//                         <Typography
//                           key={index}
//                           variant="body2"
//                           sx={{
//                             color:
//                               selectedTable === table.id
//                                 ? darkMode
//                                   ? "#CBE4DE"
//                                   : "#FFF5E1"
//                                 : darkMode
//                                 ? "#CBE4DE"
//                                 : "#FFF5E1",
//                           }}
//                         >
//                           {order.name} (x{order.quantity})
//                         </Typography>
//                       ))}
//                       <Button
//                         variant="contained"
//                         color="secondary"
//                         // onClick={() => handleFinishTable(table.id)}
//                         onClick={(e) => {
//                           e.stopPropagation(); // Prevent triggering onTableSelect
//                           onFinishTable(table.id);
//                         }}
//                         sx={{
//                           marginTop: 2,
//                           backgroundColor: darkMode ? "#0E8388" : "#186049",
//                           "&:hover": {
//                             backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
//                             color: darkMode ? "#CBE4DE" : undefined,
//                           },
//                         }}
//                       >
//                         Finish
//                       </Button>
//                     </Box>
//                   )}
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default TableSelection;
// *************************************************************************************************
// import React from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CardActionArea,
//   Button,
// } from "@mui/material";
// import { useAppStore } from "../appStore";

// const TableSelection = ({
//   tables,
//   selectedTable,
//   onTableSelect,
//   onFinishTable,
// }) => {
//   const { darkMode, setDarkMode } = useAppStore();

//   return (
//     <Box>
//       <Typography
//         variant="h5"
//         gutterBottom
//         sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
//       >
//         Select a Table
//       </Typography>
//       <Grid container spacing={2}>
//         {tables.map((table) => (
//           <Grid item xs={6} md={3} key={table._id}>
//             <Card
//               sx={{
//                 backgroundColor:
//                   table.status === "Occupied"
//                     ? darkMode
//                       ? "#A91D3A" // Dark mode color for occupied
//                       : "#FF6347" // Light mode color for occupied
//                     : darkMode
//                     ? "#186049" // Dark mode color for other statuses
//                     : "#6AB29B", // Light mode color for other statuses
//               }}
//             >
//               <CardActionArea onClick={() => onTableSelect(table._id)}>
//                 <CardContent>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color:
//                         selectedTable === table._id
//                           ? darkMode
//                             ? "#CBE4DE"
//                             : "#247158"
//                           : darkMode
//                           ? "#CBE4DE"
//                           : "#151515",
//                     }}
//                   >
//                     {table.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color:
//                         selectedTable === table._id
//                           ? darkMode
//                             ? "#CBE4DE"
//                             : "#FFF5E1"
//                           : darkMode
//                           ? "#CBE4DE"
//                           : "#FFF5E1",
//                     }}
//                   >
//                     Status: {table.status}
//                   </Typography>
//                   {table.orders && table.orders.length > 0 && (
//                     <Box mt={1}>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color:
//                             selectedTable === table._id
//                               ? darkMode
//                                 ? "#CBE4DE"
//                                 : "#FFF5E1"
//                               : darkMode
//                               ? "#CBE4DE"
//                               : "#FFF5E1",
//                         }}
//                       >
//                         Orders:
//                       </Typography>
//                       {table.orders.map((order, index) => (
//                         <Typography
//                           key={index}
//                           variant="body2"
//                           sx={{
//                             color:
//                               selectedTable === table._id
//                                 ? darkMode
//                                   ? "#CBE4DE"
//                                   : "#FFF5E1"
//                                 : darkMode
//                                 ? "#CBE4DE"
//                                 : "#FFF5E1",
//                           }}
//                         >
//                           {order.name} (x{order.quantity})
//                         </Typography>
//                       ))}
//                       <Button
//                         variant="contained"
//                         color="secondary"
//                         onClick={(e) => {
//                           e.stopPropagation(); // Prevent triggering onTableSelect
//                           onFinishTable(table._id);
//                         }}
//                         sx={{
//                           marginTop: 2,
//                           backgroundColor: darkMode ? "#0E8388" : "#186049",
//                           "&:hover": {
//                             backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
//                             color: darkMode ? "#CBE4DE" : undefined,
//                           },
//                         }}
//                       >
//                         Finish
//                       </Button>
//                     </Box>
//                   )}
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default TableSelection;
// **************************************************************************************************************
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";
import axios from "axios";
import { useAppStore } from "../appStore";

const TableSelection = ({
  selectedTable, // This prop is passed down from the parent component
  onTableSelect,
  onFinishTable,
}) => {
  const { darkMode, setDarkMode } = useAppStore();
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "/api/tables"
        );
        setTables(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };

    fetchTables();
  }, []);

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
      >
        Select a Table
      </Typography>
      <Grid container spacing={2}>
        {tables.map((table) => (
          <Grid item xs={6} md={3} key={table._id}>
            <Card
              sx={{
                backgroundColor:
                  table.status === "Occupied"
                    ? darkMode
                      ? "#A91D3A" // Dark mode color for occupied
                      : "#FF6347" // Light mode color for occupied
                    : darkMode
                    ? "#186049" // Dark mode color for other statuses
                    : "#6AB29B", // Light mode color for other statuses
              }}
            >
              <CardActionArea onClick={() => onTableSelect(table._id)}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      color:
                        selectedTable === table._id
                          ? darkMode
                            ? "#CBE4DE"
                            : "#247158"
                          : darkMode
                          ? "#CBE4DE"
                          : "#151515",
                    }}
                  >
                    {table.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color:
                        selectedTable === table._id
                          ? darkMode
                            ? "#CBE4DE"
                            : "#FFF5E1"
                          : darkMode
                          ? "#CBE4DE"
                          : "#FFF5E1",
                    }}
                  >
                    Status: {table.status}
                  </Typography>
                  {table.orders && table.orders.length > 0 && (
                    <Box mt={1}>
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            selectedTable === table._id
                              ? darkMode
                                ? "#CBE4DE"
                                : "#FFF5E1"
                              : darkMode
                              ? "#CBE4DE"
                              : "#FFF5E1",
                        }}
                      >
                        Orders:
                      </Typography>
                      {table.orders.map((order, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{
                            color:
                              selectedTable === table._id
                                ? darkMode
                                  ? "#CBE4DE"
                                  : "#FFF5E1"
                                : darkMode
                                ? "#CBE4DE"
                                : "#FFF5E1",
                          }}
                        >
                          {order._id} (x{order.quantity})
                        </Typography>
                      ))}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering onTableSelect
                          onFinishTable(table._id);
                        }}
                        sx={{
                          marginTop: 2,
                          backgroundColor: darkMode ? "#0E8388" : "#186049",
                          "&:hover": {
                            backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
                            color: darkMode ? "#CBE4DE" : undefined,
                          },
                        }}
                      >
                        Finish
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TableSelection;
