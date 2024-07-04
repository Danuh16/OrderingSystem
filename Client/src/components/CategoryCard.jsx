// import React, { useState } from "react";
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Collapse,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import CategoryItemCard from "./CategoryItemCard";

// const CategoryCard = ({ category }) => {
//   const [expanded, setExpanded] = useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Card>
//       <CardMedia
//         component="img"
//         height="140"
//         image={category.image}
//         alt={category.name}
//       />
//       <CardContent>
//         <Typography variant="h5">{category.name}</Typography>
//         <IconButton
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </CardContent>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Grid container spacing={2}>
//             {category.items.map((item) => (
//               <Grid item xs={12} sm={6} md={4} key={item.id}>
//                 <CategoryItemCard item={item} />
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// };

// export default CategoryCard;

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  ButtonBase,
  Divider,
  Grid,
  Stack,
} from "@mui/material";
import { useAppStore } from "../appStore";

const CategoryCard = ({ category, onClick }) => {
  const darkMode = useAppStore((state) => state.darkMode);
  return (
    <Grid spacing={2}>
      <ButtonBase
        onClick={onClick}
        sx={{
          display: "block",
          width: "100%",
        }}
      >
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardMedia
            component="img"
            height="120"
            image={category.image}
            alt={category.name}
          />
          <Divider />
          <CardContent sx={{ flexGrow: 1, padding: 1 }}>
            <Typography
              variant="h6"
              sx={{ color: darkMode ? "#CBE4DE" : "#247158", flexGrow: 1 }}
            >
              {category.name}
            </Typography>
          </CardContent>
        </Card>
      </ButtonBase>
    </Grid>
  );
};

export default CategoryCard;
