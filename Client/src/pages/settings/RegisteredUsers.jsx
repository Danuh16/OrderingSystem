import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useAppStore } from "../../appStore";
import {
  Typography,
  Divider,
  Button,
  Box,
  Stack,
  TextField,
  Autocomplete,
  Modal,
  Skeleton,
} from "@mui/material";
import {
  AddCircle as AddCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";
import Register from "./Register";
import EditUser from "./EditUser";
import EditPermission from "./EditPermission";
import axios from "axios";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RegisteredUsers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false); // Initialize open state to false
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const rows = useAppStore((state) => state.rows);
  const setRows = useAppStore((state) => state.setRows);
  const darkMode = useAppStore((state) => state.darkMode);
  const [editOpen, setEditOpen] = useState(false);
  const [formid, setFormid] = useState("");
  const [formPermission, setFormPermission] = useState("");
  const [permissionOpen, setPermissionOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch all products when the component mounts
    fetchAllUsers();
  }, []); // Empty dependency array to fetch products only once when the component mounts

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/userList"
      );
      setRows(response.data); // Update the rows state with fetched products
      setLoading(false); // Set loading to false after fetching products
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tableHeaders = [
    { label: "Id", field: "" },
    { label: "User Name", field: "username" },
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Role", field: "role" },
    { label: "Action", field: "action" },
  ];

  const filterData = async (value) => {
    setSearchValue(value);
    if (!value) {
      fetchAllUsers(); // Fetch all users if the search value is empty
    } else {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + `/userList/get/${value}`
        ); // Adjust the API endpoint accordingly
        setRows(response.data); // Assuming response.data is the list of filtered users
      } catch (error) {
        console.error("Error searching users:", error);
      }
    }
  };

  const editUser = (username, firstName, lastName, role) => {
    const data = {
      username,
      firstName,
      lastName,
      role,
    };
    setFormid(data);
    setEditOpen(true);
  };

  const editPermission = (fullName, email, role) => {
    const permission = {
      fullName,
      email,
      role,
    };
    setFormPermission(permission);
    setPermissionOpen(true);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      background: darkMode ? "#2E4F4F" : "#FFFFFF",
      color: darkMode ? "#CBE4DE" : "#2C3333",
      showCancelButton: true,
      confirmButtonColor: darkMode ? "#0E8388" : "#186049",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.value) {
        try {
          // Send a DELETE request to your backend API endpoint
          const response = await axios.delete(
            `http://localhost:8000/product/delete/${id}` //!!!!!!!!!!!!!!!!!!!API!!!!!!!!!!!!!!!!!!!!!!
          );

          // Check if the user was successfully deleted
          if (response.status === 200) {
            // Remove the deleted user from the local state (rows)
            setRows(rows.filter((row) => row.fullName !== id));

            // Show a success message using SweetAlert2
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
              background: darkMode ? "#2E4F4F" : "#FFFFFF",
              color: darkMode ? "#CBE4DE" : "#2C3333",
              didOpen: () => {
                const confirmButton = document.querySelector(".swal2-confirm");
                if (confirmButton) {
                  fetchAllUsers(); // Refresh the user list
                  confirmButton.style.backgroundColor = darkMode
                    ? "#0E8388"
                    : "#186049";
                  confirmButton.style.color = darkMode ? "#CBE4DE" : undefined;
                  confirmButton.addEventListener("mouseenter", () => {
                    confirmButton.style.backgroundColor = darkMode
                      ? "#2E4F4F"
                      : "#95877A";
                    confirmButton.style.color = darkMode
                      ? "#CBE4DE"
                      : undefined;
                  });
                  confirmButton.addEventListener("mouseleave", () => {
                    confirmButton.style.backgroundColor = darkMode
                      ? "#0E8388"
                      : "#186049";
                    confirmButton.style.color = darkMode
                      ? "#CBE4DE"
                      : undefined;
                  });
                }
              },
            });
          } else {
            // Show an error message if the user deletion fails
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the user.",
              icon: "error",
              background: darkMode ? "#2E4F4F" : "#FFFFFF",
              color: darkMode ? "#CBE4DE" : "#2C3333",
            });
          }
        } catch (error) {
          // Show an error message if there's an error with the HTTP request
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the user.",
            icon: "error",
            background: darkMode ? "#2E4F4F" : "#FFFFFF",
            color: darkMode ? "#CBE4DE" : "#2C3333",
          });
        }
      }
    });
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Register closeEvent={handleClose} />
        </Box>
      </Modal>
      <Modal
        open={editOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditUser closeEvent={() => setEditOpen(false)} fid={formid} />
        </Box>
      </Modal>

      <Modal
        open={permissionOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditPermission
            closeEvent={() => setPermissionOpen(false)}
            fid={formPermission}
          />
        </Box>
      </Modal>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography
          variant="h5"
          sx={{ padding: "20px", color: darkMode ? "#CBE4DE" : "#247158" }}
        >
          Users
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" className="my-2 mb-2" alignItems="center">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            loading={loading}
            getOptionLabel={(rows) => rows.fullName || ""}
            sx={{ width: 300, marginLeft: "10px" }}
            onInputChange={(e, value) => {
              setSearchValue(value);
              if (value) {
                filterData(value);
              } else {
                fetchAllUsers();
              }
            }}
            onChange={(e, value) => {
              setSelectedUser(value);
              if (value) {
                setRows([value]);
              } else {
                fetchAllUsers();
              }
            }}
            inputValue={searchValue}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Search User"
                inputProps={{
                  ...params.inputProps,
                  style: { color: darkMode ? "#CBE4DE" : "#247158" },
                }}
                InputProps={{
                  ...params.InputProps,
                  sx: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: darkMode ? "#CBE4DE" : "#247158",
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: darkMode ? "#CBE4DE" : "#247158",
                    },
                  },
                }}
              />
            )}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={handleOpen}
            sx={{
              marginRight: "10px",
              backgroundColor: darkMode ? "#0E8388" : "#186049",
              "&:hover": {
                backgroundColor: darkMode ? "#2E4F4F" : "#95877A",
                color: darkMode ? "#CBE4DE" : undefined,
              },
            }}
          >
            Add User
          </Button>
        </Stack>
        <Box height={10} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header.field}
                    align="left"
                    style={{
                      minWidth: "100px",
                      fontWeight: "bold",
                      color: darkMode ? "#CBE4DE" : "#247158",
                    }}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={tableHeaders.length}>
                    <Skeleton animation="wave" />
                  </TableCell>
                </TableRow>
              ) : (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {tableHeaders.map((header) => (
                        <TableCell
                          align="left"
                          key={header.field}
                          style={{ color: darkMode ? "#CBE4DE" : "#247158" }}
                        >
                          {header.field === "action" ? (
                            <Stack spacing={2} direction="row">
                              <EditIcon
                                style={{
                                  fontSize: "20px",
                                  color: darkMode ? "#0E8388" : "#186049",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  editUser(
                                    row.username,
                                    row.firstName,
                                    row.lastName,
                                    row.role
                                  )
                                }
                              />
                              <DeleteIcon
                                style={{
                                  fontSize: "20px",
                                  color: darkMode ? "red" : "darkred",
                                  cursor: "pointer",
                                }}
                                //onClick={() => deleteUser(row.fullName)}
                              />
                              <KeyIcon
                                style={{
                                  fontSize: "20px",
                                  color: darkMode ? "#3DC2EC" : "#402E7A",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  editPermission(
                                    row.fullName,
                                    row.email,
                                    row.role
                                  )
                                }
                              />
                            </Stack>
                          ) : (
                            row[header.field]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{
            color: darkMode ? "#0E8388" : "#247158",
          }}
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
