import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, Box, Avatar, Button, Modal, TextField } from "@mui/material";
import { AuthContext } from "./AuthContext"; 
import { jwtDecode } from "jwt-decode"; 
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; 
import { Edit } from "@mui/icons-material";
import axios from "axios"; 

const Profile = () => {
  const { token, userRole } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false); 
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (token && userRole === "guest") {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded?.user);
        setEditData(decoded?.user); // Edit modal ke liye default data
      } catch (error) {
        console.error("Invalid Token:", error);
      }
    }
  }, [token, userRole]);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await axios.put("http://localhost:2000/api/User/updateProfile", {
  //       id: userData.id,
  //       name: editData.name,
  //       email: editData.email,
  //       phoneNumber: editData.phone, // ensuring field mapping
  //       address: editData.address,
  //     }, {
  //       headers: { "Content-Type": "application/json" }
  //     });
      
  //     if (response.data.success) {
  //       // Update AuthContext if you have a method for that, or update localStorage
  //       localStorage.setItem(`token_${userRole}`, response.data.token);
  //       setUserData(response.data.user); // This updates the UI immediately
  //       setOpen(false);
  //     }
  //   } catch (error) {
  //     console.error("Update Error:", error);
  //   }
  // };
  
  const handleSave = async () => {
  try {
    const response = await axios.put(
      "http://localhost:2000/api/User/updateProfile",
      {
        id: userData.id,
        name: editData.name,
        email: editData.email,
        phoneNumber: editData.phone, // ensure mapping: "phone" -> "phoneNumber"
        address: editData.address,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    
    if (response.data.success) {
      // Update local state and localStorage
      setUserData(response.data.user);
      localStorage.setItem(`token_${userRole}`, response.data.token);
      
      // Dispatch custom event to notify other parts of the app
      window.dispatchEvent(new Event("profileUpdated"));
      
      setOpen(false);
    }
  } catch (error) {
    console.error("Update Error:", error);
  }
};

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5, px: 2 }}>
      <Card 
        sx={{
          maxWidth: 450,
          width: "100%",
          padding: 3,
          boxShadow: 5,
          textAlign: "center",
          borderRadius: 3,
          background: "linear-gradient(to right,rgb(16, 44, 68),rgb(20, 33, 108))",
          color: "white",
        }}
      >
        <CardContent>
          <Avatar sx={{ bgcolor: "white", width: 80, height: 80, margin: "0 auto 10px" }}>
            <AccountCircleIcon sx={{ fontSize: 70, color: "#4facfe" }} />
          </Avatar>

          <Typography variant="h3" fontFamily={'serif'} gutterBottom sx={{ fontWeight: "bold" }}>
            Guest Profile
          </Typography>

          {userData ? (
            <>
              <Typography variant="body1" fontFamily={'serif'} sx={{ fontSize: "1.5rem", mb: 1 }}>
                <strong>Name:</strong> {userData.name}
              </Typography>
              <Typography variant="body1" fontFamily={'serif'} sx={{ fontSize: "1.5rem", mb: 1 }}>
                <strong>Email:</strong> {userData.email || "Not available"}
              </Typography>
              <Typography variant="body1" fontFamily={'serif'} sx={{ fontSize: "1.5rem", mb: 1 }}>
                <strong>Role:</strong> {userData.role}
              </Typography>
              <Typography variant="body1" fontFamily={'serif'} sx={{ fontSize: "1.5rem", mb: 1 }}>
                <strong>Phone Number:</strong> {userData.phone}
              </Typography>
              <Typography variant="body1" fontFamily={'serif'} sx={{ fontSize: "1.5rem", mb: 1 }}>
                <strong>Address:</strong> {userData.address}
              </Typography>
              <Typography variant="body1" fontFamily={'serif'} sx={{ fontSize: "1.5rem" }}>
                <strong>Account Status:</strong> {userData.accountStatus ? "✅ Active" : "❌ Inactive"}
              </Typography>
              <Button variant="contained" sx={{ mx: 1, mt: 2 }} color="warning" startIcon={<Edit />} onClick={handleEditClick}>Edit</Button>
            </>
          ) : (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {userRole !== "guest" ? "Access denied. Only guest can view this page." : "No user data available."}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
          bgcolor: "white", boxShadow: 24, p: 4, borderRadius: 2, width: 400 
        }}>
          <Typography variant="h6" gutterBottom>Edit Profile</Typography>
          <TextField fullWidth margin="normal" label="Name" name="name" value={editData.name || ""} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Email" name="email" value={editData.email || ""} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Phone" name="phone" value={editData.phone || ""} onChange={handleChange} />
          <TextField fullWidth margin="normal" label="Address" name="address" value={editData.address || ""} onChange={handleChange} />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Profile;
