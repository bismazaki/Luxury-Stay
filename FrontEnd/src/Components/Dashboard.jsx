import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h2">Admin Dashboard</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>Welcome to your dashboard</Typography>
      <Button variant="contained" color="error" sx={{ mt: 4 }} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
