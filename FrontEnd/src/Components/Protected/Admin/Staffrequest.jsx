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
} from "@mui/material";
import { CheckCircle, Block } from "@mui/icons-material";
import RequestPageIcon from '@mui/icons-material/RequestPage';

const Staffrequest = () => {
  const [inactiveStaff, setInactiveStaff] = useState([]);

  useEffect(() => {
    fetchInactiveStaff();
  }, []);

  const fetchInactiveStaff = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/User/inactive-staff");
      setInactiveStaff(response.data.inactiveStaff);
    } catch (error) {
      console.error("Error fetching inactive staff:", error);
    }
  };

  const updateStatus = async (userId, status) => {
    try {
      await axios.put("http://localhost:2000/api/User/update-staff-status", { userId, accountStatus: status });
      fetchInactiveStaff(); // Refresh list after update
    } catch (error) {
      console.error("Error updating staff status:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
         <RequestPageIcon fontSize="lg"/>Staff Registration Requests: 
        </Typography>
      </Box>

      {inactiveStaff.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No inactive staff members.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "navy" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inactiveStaff.map((staff) => (
                <TableRow key={staff.userId}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircle />}
                      onClick={() => updateStatus(staff.userId, "Active")}
                      sx={{ mr: 1 }}
                    >
                      Activate
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Block />}
                      onClick={() => updateStatus(staff.userId, "Inactive")}
                    >
                      Deactivate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Staffrequest;
