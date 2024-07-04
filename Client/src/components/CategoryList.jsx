// import React from "react";
// import { Stack, Button } from "@mui/material";

// const CategoryList = ({ categories, onCategoryClick }) => {
//   return (
//     <Stack direction="row" spacing={3}>
//       {categories.map((category) => (
//         <Button
//           key={category.id}
//           variant="contained"
//           onClick={() => onCategoryClick(category)}
//         >
//           {category.name}
//         </Button>
//       ))}
//     </Stack>
//   );
// };

// export default CategoryList;

import React from "react";
import { Grid, Stack, Box } from "@mui/material";
import CategoryCard from "./CategoryCard";

const CategoryList = ({ categories, onCategoryClick }) => {
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item key={category.id} xs={12} sm={6} md={4} lg={1.5}>
          <Box mb={3}>
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onCategoryClick(category)}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryList;
