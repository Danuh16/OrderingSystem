import React from "react";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const TableList = ({ tables, onSelect }) => {
  return (
    <Paper elevation={3}>
      <Typography variant="h6" gutterBottom style={{ padding: "16px" }}>
        Tables
      </Typography>
      <List>
        {tables.map((table) => (
          <ListItem button key={table.id} onClick={() => onSelect(table)}>
            <ListItemText primary={`Table ${table.number}`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TableList;
