import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppStore } from "../appStore";

const CategoryItem = ({ item }) => {
  const { addOrder } = useAppStore();

  const handleAdd = () => {
    // Add the item to the order store
    addOrder(item);
  };

  return (
    <ListItem>
      <ListItemText primary={item.name} secondary={`$${item.price}`} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="add" onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default CategoryItem;
