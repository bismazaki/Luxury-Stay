import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
    // const location = useLocation();
    // const isDashboard = location.pathname.includes("dashboard");
  
    const [user, setUser] = useState({
      name: "",
      email: "",
      phoneNumber: "",
      role: "Staff", // Ensure default role is set
      password: "",
    });
  
    const handleChange = (e) => {
      setUser((prevUser) => ({
        ...prevUser,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:2000/api/User/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
  
        if (!response.ok) throw new Error("Registration failed");
  
        toast.success("Registration Successful! waiting for Admin response...", {
          position: "top-center",
        });
  
        setTimeout(() => {
          navigate("/logindashboard");
        }, 2000);
      } catch (error) {
        toast.error("Registration Failed. Please try again.");
      }
    };
  
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Container maxWidth="sm">
          <Paper elevation={10} sx={{ padding: "40px", borderRadius: "15px" }}>
            <Box textAlign="center">
              <AccountCircle sx={{ fontSize: 60, color: "#000080" }} />
              <Typography variant="h3" fontWeight="bold" mt={1}>
                Register
              </Typography>
            </Box>
  
            <form onSubmit={handleSubmit}>
              <TextField required name="name" label="Full Name" fullWidth sx={{ my: 2 }} value={user.name} onChange={handleChange} />
              <TextField required name="email" label="Email" type="email" fullWidth sx={{ my: 2 }} value={user.email} onChange={handleChange} />
              <TextField required name="phoneNumber" label="Phone Number" fullWidth sx={{ my: 2 }} value={user.phoneNumber} onChange={handleChange} />
  
           
  
              <TextField required name="password" label="Password" type="password" fullWidth sx={{ mb: 2 }} value={user.password} onChange={handleChange} />
  
              <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#000080", color: "white" }}>
                Register
              </Button>
            </form>
  
            <Typography textAlign="center" my={2}>
              Already have an account? <Link to="/logindashboard">Login</Link>
            </Typography>
          </Paper>
        </Container>
        <ToastContainer />
      </Box>
    );
  };
export default Register
