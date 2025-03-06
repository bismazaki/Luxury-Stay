import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Modal,
  TextField,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ 
    name: "", 
    email: "", 
    password: "",  // Added password field
    phoneNumber: "",  // Added phone number field
    role: "Staff",  // Capitalized "Staff"
    status: "Active" 
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:2000/api/User/getusers-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Filter out users with the role "Admin"
      const filteredUsers = response.data.filter(user => user.role !== "Admin");

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
  
      await axios.delete(`http://localhost:2000/api/User/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  const handleAddUser = async () => {
    try {
      const token = localStorage.getItem("token");
  
      await axios.post(
        "http://localhost:2000/api/User/add-user",
        newUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewUser({ 
      name: "", 
      email: "", 
      password: "",  
      phoneNumber: "",  
      role: "Staff",  
      status: "Active" 
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">User Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>Add User</Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "navy" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.accountStatus}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => handleDelete(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Adding User */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, backgroundColor: "white", p: 3, mx: "auto", mt: 10, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Add User</Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={newUser.phoneNumber}
            onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
          />
          <TextField
            label="Role"
            fullWidth
            margin="normal"
            select
            SelectProps={{ native: true }}
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="Staff">Staff</option>  
            <option value="Admin">Admin</option>
          </TextField>
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          />
          <Box sx={{ textAlign: "right", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddUser}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default UserManagement;
