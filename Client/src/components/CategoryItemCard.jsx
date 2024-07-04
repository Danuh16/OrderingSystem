import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useAppStore } from "../appStore";

const CategoryItemCard = ({ item }) => {
  const { addOrder } = useAppStore();

  const handleAdd = () => {
    addOrder(item);
  };

  return (
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
      <CardActions>
        <Button size="small" color="primary" onClick={handleAdd}>
          Add to Order
        </Button>
      </CardActions>
    </Card>
  );
};

export default CategoryItemCard;
