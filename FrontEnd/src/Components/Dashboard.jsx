import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
<<<<<<< Updated upstream
=======
  const user = localStorage.getItem("user"); // Check if user is logged in
>>>>>>> Stashed changes

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login
  };

<<<<<<< Updated upstream
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h2">Admin Dashboard</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>Welcome to your dashboard</Typography>
      <Button variant="contained" color="error" sx={{ mt: 4 }} onClick={handleLogout}>
        Logout
      </Button>
  const handleLogin = () => {
    navigate("/login"); // Redirect to login
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2">Admin Dashboard</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>Welcome to your dashboard</Typography>

      {user ? (
        <Button variant="contained" color="error" sx={{ mt: 4 }} onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleLogin}>
          Login
        </Button>
      )}

    </Box>
  );
};

export default Dashboard;
