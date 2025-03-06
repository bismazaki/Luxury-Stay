import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { AuthContext } from "../../AuthContext"; 
import { jwtDecode } from "jwt-decode"; 
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import icon

const Profile = () => {
  const { token, userRole } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token && userRole === "admin") {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded?.user);
      } catch (error) {
        console.error("Invalid Token:", error);
      }
    }
  }, [token, userRole]);

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
          background: "linear-gradient(to right,rgb(16, 44, 68),rgb(20, 33, 108))", // Gradient background
          color: "white",
        }}
      >
        <CardContent>
          {/* Profile Icon */}
          <Avatar sx={{ bgcolor: "white", width: 80, height: 80, margin: "0 auto 10px" }}>
            <AccountCircleIcon sx={{ fontSize: 70, color: "#4facfe" }} />
          </Avatar>

          <Typography variant="h3" fontFamily={'serif'} gutterBottom sx={{ fontWeight: "bold" }}>
            Admin Profile
          </Typography>

          {userData ? (
            <>
              <Typography variant="body1" fontFamily={'serif'} sx={{ fontSize: "1.5rem", mb: 1 }}>
                <strong>Name:</strong> {userData.name}
              </Typography>
              <Typography variant="body1" fontFamily={'serif'}  sx={{ fontSize: "1.5rem", mb: 1 }}>
                <strong>Email:</strong> {userData.email || "Not available"}
              </Typography>
              <Typography variant="body1" fontFamily={'serif'} sx={{ fontSize: "1.5rem", mb: 1 }}>
                <strong>Role:</strong> {userData.role}
              </Typography>
              <Typography variant="body1" fontFamily={'serif'} sx={{ fontSize: "1.5rem" }}>
                <strong>Account Status:</strong> {userData.accountStatus ? "✅ Active" : "❌ Inactive"}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {userRole !== "admin" ? "Access denied. Only admins can view this page." : "No user data available."}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
