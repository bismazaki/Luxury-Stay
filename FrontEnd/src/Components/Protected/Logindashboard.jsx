// import React, { useContext, useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Paper,
//   TextField,
//   Typography,
//   Checkbox,
//   FormControlLabel
// } from "@mui/material";
// import { Lock } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../AuthContext"

// const Logindashboard = () => {

//     const navigate = useNavigate();
    
//       const [credentials, setCredentials] = useState({
//         email: "",
//         password: "",
//         role: "Staff",
//       });
//       const { handleLogin } = useContext(AuthContext);
    
//       const handleChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await fetch("http://localhost:2000/api/User/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(credentials),
//           });
      
//           const data = await response.json();
//           console.log("API Response:", data);
      
//           if (!response.ok) throw new Error(data.error || "Login failed");
      
//           if (data.token) {
//             localStorage.setItem("token", data.token);
//             handleLogin(data.token); // ✅ Token Save Karein
//             toast.success("Login Successful!", { position: "top-center" });
      
//             setTimeout(() => {
//               navigate("/");
//             }, 2000);
//           } else {
//             toast.warning("Unauthorized Role! Redirecting...", { position: "top-center" });
//             setTimeout(() => {
//               navigate("/");
//             }, 2000);
//           }
//         } catch (error) {
//           console.error("Error:", error);
//           toast.error("Invalid Credentials. Please try again.", { position: "top-center" });
//         }
//       };
      
//       return (
//         <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
//           <Container maxWidth="sm">
//             <Paper elevation={10} sx={{ padding: "40px", borderRadius: "15px" }}>
//               <Box textAlign="center">
//                 <Lock sx={{ fontSize: 60, color: "#000080" }} />
//                 <Typography variant="h3" fontWeight="bold" mt={1}>
//                   Login
//                 </Typography>
//               </Box>
    
//               <form onSubmit={handleSubmit}>
//                 <TextField
//                   required
//                   name="email"
//                   label="Email Address"
//                   type="email"
//                   fullWidth
//                   placeholder="Enter Email"
//                   sx={{ my: 2 }}
//                   value={credentials.email}
//                   onChange={handleChange}
//                 />
//                 <TextField
//                   required
//                   name="password"
//                   label="Password"
//                   type="password"
//                   fullWidth
//                   placeholder="Enter Password"
//                   sx={{ mb: 2 }}
//                   value={credentials.password}
//                   onChange={handleChange}
//                 />
    
//                 <FormControlLabel control={<Checkbox />} label="Remember Me" />
    
//                 <Typography textAlign="right" sx={{ cursor: "pointer", mb: 2, color: "blue" }}>
//                   <b>Forgot Your Password?</b>
//                 </Typography>
    
//                 <Button
//                   type="submit"
//                   fullWidth
//                   variant="contained"
//                   sx={{
//                     bgcolor: "#000080",
//                     color: "white",
//                     fontSize: "18px",
//                     fontWeight: "bold",
//                     py: 1.5,
//                     borderRadius: "10px",
//                     "&:hover": { bgcolor: "#001f4d" },
//                   }}
//                 >
//                   Login
//                 </Button>
//               </form>
    
//               <Typography textAlign="center" my={2}>
//                 Don't Have An Account? <b style={{ color: "#6a11cb" }}> <Link to={"/Registerdashboard"}>Signup</Link></b>
//               </Typography>
//             </Paper>
//           </Container>
//           <ToastContainer />
//         </Box>
//       );
//     };
  

// export default Logindashboard


import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthContext";

const Logindashboard = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "Staff",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2000/api/User/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) throw new Error(data.error || "Login failed");

      if (data.token) {
        localStorage.setItem("token", data.token);
        handleLogin(data.token);
        toast.success("Login Successful!", { position: "top-center" });

        setTimeout(() => {
          if (data.role === "Admin") {
            navigate("/admin-dashboard");
          } else {
            navigate("/staff-dashboard");
          }
        }, 2000);
      } else {
        toast.warning("Unauthorized Role! Redirecting...", { position: "top-center" });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Invalid Credentials. Please try again.", { position: "top-center" });
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
            <Lock sx={{ fontSize: 60, color: "#000080" }} />
            <Typography variant="h3" fontWeight="bold" mt={1}>
              Login
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              required
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              placeholder="Enter Email"
              sx={{ my: 2 }}
              value={credentials.email}
              onChange={handleChange}
            />
            <TextField
              required
              name="password"
              label="Password"
              type="password"
              fullWidth
              placeholder="Enter Password"
              sx={{ mb: 2 }}
              value={credentials.password}
              onChange={handleChange}
            />

            <FormControlLabel control={<Checkbox />} label="Remember Me" />

            <Typography textAlign="right" sx={{ cursor: "pointer", mb: 2, color: "blue" }}>
              <b>Forgot Your Password?</b>
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#000080",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                py: 1.5,
                borderRadius: "10px",
                "&:hover": { bgcolor: "#001f4d" },
              }}
            >
              Login
            </Button>
          </form>

          <Typography textAlign="center" my={2}>
            Don't Have An Account?{' '}
            <b style={{ color: "#6a11cb" }}>
              <Link to={"/Registerdashboard"}>Signup</Link>
            </b>
          </Typography>
        </Paper>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default Logindashboard;

