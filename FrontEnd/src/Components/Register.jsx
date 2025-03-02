<<<<<<< Updated upstream
=======
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   FormControlLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { AccountCircle } from "@mui/icons-material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const Register = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     role: "Guest",
//     password: "",
//     address: "",
//     preferences: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:2000/api/User/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error("Failed to register");

//       const data = await response.json();
//       console.log("Form Data Submitted:", data);

//       // Show success toast
//       toast.success("Account Created Successfully!", { position: "top-center" });

//       // Clear form fields
//       setFormData({
//         name: "",
//         email: "",
//         phoneNumber: "",
//         role: "Guest",
//         password: "",
//         address: "",
//         preferences: "",
//       });

//       // Redirect to Login after 2 seconds
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Registration Failed. Please try again.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(to right,rgba(178, 167, 190, 0.25),rgba(11, 37, 84, 0.13))",
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "20px",
//       }}
//     >
//       <Container maxWidth="sm">
//         <Paper elevation={10} sx={{ padding: "30px", borderRadius: "15px" }}>
//           <Box textAlign="center">
//             <AccountCircle sx={{ fontSize: 60, color: "#000080" }} />
//             <Typography variant="h4" fontWeight="bold" mt={1}>
//               Register
//             </Typography>
//           </Box>

//           <form onSubmit={handleSubmit}>
//             <TextField name="name" label="Full Name" fullWidth required sx={{ my: 1 }} value={formData.name} onChange={handleChange} />
//             <TextField name="email" label="Email" type="email" fullWidth required sx={{ my: 1 }} value={formData.email} onChange={handleChange} />
//             <TextField name="phoneNumber" label="Phone Number" fullWidth required sx={{ my: 1 }} value={formData.phoneNumber} onChange={handleChange} />

//             <Select fullWidth name="role" value={formData.role} onChange={handleChange} sx={{ my: 1 }}>
//               {["Admin", "Staff", "Guest"].map((role) => (
//                 <MenuItem key={role} value={role}>
//                   {role}
//                 </MenuItem>
//               ))}
//             </Select>

//             {formData.role === "Guest" && (
//               <>
//                 <TextField name="address" label="Address" fullWidth required sx={{ my: 1 }} value={formData.address} onChange={handleChange} />
//                 <TextField name="preferences" label="Preferences" fullWidth required sx={{ my: 1 }} value={formData.preferences} onChange={handleChange} />
//               </>
//             )}

//             <TextField name="password" label="Password" type="password" fullWidth required sx={{ my: 1 }} value={formData.password} onChange={handleChange} />

//             <FormControlLabel control={<Checkbox />} label="Remember Me" sx={{ my: 1 }} />

//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 bgcolor: "#000080",
//                 color: "white",
//                 fontSize: "18px",
//                 fontWeight: "bold",
//                 py: 1.5,
//                 borderRadius: "10px",
//                 "&:hover": { bgcolor: "#001f4d" },
//               }}
//             >
//               Register
//             </Button>
//           </form>
//         </Paper>
//       </Container>

//       {/* Toast Notification */}
//       <ToastContainer />
//     </Box>
//   );
// };

// export default Register;

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.includes("dashboard");

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: isDashboard ? "Staff" : "Guest", // Ensure default role is set
    address: "",
    preferences: "",
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

      toast.success("Registration Successful! Redirecting to login...", {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/login");
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

            {/* Role Selection */}
            {isDashboard ? (
              <TextField
                select
                name="role"
                label="Role"
                fullWidth
                sx={{ my: 2 }}
                value={user.role}
                onChange={handleChange}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </TextField>
            ) : (
              <Typography sx={{ my: 2, fontWeight: "bold" }}>You are registering as a Guest</Typography>
            )}

            {/* Address & Preferences for Guests */}
            {user.role === "Guest" && (
              <>
                <TextField required name="address" label="Address" fullWidth sx={{ my: 2 }} value={user.address} onChange={handleChange} />
                <TextField required name="preferences" label="Preferences" fullWidth sx={{ my: 2 }} value={user.preferences} onChange={handleChange} />
              </>
            )}

            <TextField required name="password" label="Password" type="password" fullWidth sx={{ mb: 2 }} value={user.password} onChange={handleChange} />

            <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#000080", color: "white" }}>
              Register
            </Button>
          </form>

          <Typography textAlign="center" my={2}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default Register;
>>>>>>> Stashed changes
