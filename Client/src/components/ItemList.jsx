import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  ButtonBase,
} from "@mui/material";
import { useAppStore } from "../appStore";

const ItemList = ({ items, onAddItem }) => {
  const darkMode = useAppStore((state) => state.darkMode);
  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <ButtonBase
            onClick={() => onAddItem(item)}
            sx={{
              display: "block",
              width: "100%",
            }}
          >
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="textSecondary">${item.price}</Typography>
              </CardContent>
              {/* <CardActions>
                <Button
                  size="small"
                  sx={{ color: darkMode ? "#CBE4DE" : "#247158" }}
                  onClick={() => onAddItem(item)}
                >
                  Add to Order
                </Button>
              </CardActions> */}
            </Card>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;
