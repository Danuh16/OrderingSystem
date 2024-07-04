// import React from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
// } from "@mui/material";
// import { useAppStore } from "../appStore";

// const SelectedItemsSidebar = ({ selectedItems, onSendToKitchen }) => {
//   const darkMode = useAppStore((state) => state.darkMode);
//   return (
//     <Card>
//       <CardContent>
//         <Typography
//           variant="h6"
//           sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
//         >
//           Selected Items
//         </Typography>
//         <List>
//           {selectedItems.map((item) => (
//             <ListItem key={item.id}>
//               <ListItemText
//                 primary={`${item.name} x${item.quantity}`}
//                 secondary={`$${item.price * item.quantity}`}
//                 sx={{
//                   primary: {
//                     color: darkMode ? "#CBE4DE" : undefined,
//                   },
//                   secondary: {
//                     color: darkMode ? "#CBE4DE" : undefined,
//                   },
//                 }}
//               />
//             </ListItem>
//           ))}
//         </List>
//         <Button
//           variant="contained"
//           onClick={onSendToKitchen}
//           fullWidth
//           sx={{
//             marginRight: "10px",
//             backgroundColor: darkMode ? "#0E8388" : "#186049",
//             "&:hover": {
//               backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
//               color: darkMode ? "#CBE4DE" : undefined,
//             },
//           }}
//         >
//           Send to Kitchen
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default SelectedItemsSidebar;

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { useAppStore } from "../appStore";

const SelectedItemsSidebar = ({
  selectedItems,
  onSendToKitchen,
  onDiscardItem,
  onDecrementItem,
}) => {
  const darkMode = useAppStore((state) => state.darkMode);

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
        >
          Selected Items
        </Typography>
        <List>
          {selectedItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.name} x${item.quantity}`}
                secondary={`$${item.price * item.quantity}`}
                sx={{
                  primary: {
                    color: darkMode ? "#CBE4DE" : undefined,
                  },
                  secondary: {
                    color: darkMode ? "#CBE4DE" : undefined,
                  },
                }}
              />
              <Button
                variant="outlined"
                onClick={() =>
                  item.quantity > 1
                    ? onDecrementItem(item.id)
                    : onDiscardItem(item.id)
                }
                sx={{
                  marginLeft: "10px",
                  backgroundColor: darkMode ? "#ED2B2A" : "#CD1818",
                  color: darkMode ? "#ffffff" : "#000000",
                  "&:hover": {
                    backgroundColor: darkMode ? "#F05941" : "#ED2B2A",
                    color: darkMode ? "#000000" : "#ffffff",
                  },
                }}
              >
                {item.quantity > 1 ? "Decrement" : "Discard"}
              </Button>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          onClick={onSendToKitchen}
          fullWidth
          sx={{
            marginTop: "10px",
            backgroundColor: darkMode ? "#0E8388" : "#186049",
            "&:hover": {
              backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
              color: darkMode ? "#CBE4DE" : undefined,
            },
          }}
        >
          Send to Kitchen
        </Button>
      </CardContent>
    </Card>
  );
};

export default SelectedItemsSidebar;
