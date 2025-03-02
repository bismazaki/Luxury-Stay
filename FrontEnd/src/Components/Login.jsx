<<<<<<< Updated upstream
=======
// import React from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   FormControlLabel,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { AccountCircle, Facebook, GitHub, Google, Twitter } from "@mui/icons-material";
// import { Link } from "react-router-dom";

// const Login = () => {
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
//         <Paper elevation={10} sx={{ padding: "40px", borderRadius: "15px" }}>
//           <Box textAlign="center">
//             <AccountCircle sx={{ fontSize: 60, color: "#000080" }} />
//             <Typography variant="h3" fontFamily={"'Cinzel', serif"} fontWeight="bold" mt={1}>
//               Login
//             </Typography>
//           </Box>

//           {/* Input Fields */}
//           <TextField
//             required
//             label="Email Address"
//             type="email"
//             variant="outlined"
//             fullWidth
//             placeholder="Enter Email"
//             sx={{ my: 2, borderRadius: "8px" }}
//           />
//           <TextField
//             required
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             placeholder="Enter Password"
//             sx={{ mb: 2, borderRadius: "8px" }}
//           />

//           <FormControlLabel control={<Checkbox />} label="Remember Me" />

//           <Typography textAlign="right" sx={{ cursor: "pointer", mb: 2 , color: 'blue' }}>
//             <b>Forgot Your Password?</b>
//           </Typography>

//           {/* Login Button */}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               bgcolor: "#000080",
//               color: "white",
//               fontSize: "18px",
//               fontWeight: "bold",
//               py: 1.5,
//               borderRadius: "10px",
//               "&:hover": { bgcolor: "#001f4d" },
//             }}
//           >
//             Login
//           </Button>

//           <Typography color="gray" textAlign="center" my={2}>
//             Don't Have An Account? <b style={{ color: "#6a11cb", cursor: "pointer" }}> <Link to={'/register'}> Signup</Link></b>
//           </Typography>

//           {/* Social Media Login */}
//           <Box
//             sx={{
//               backgroundColor: "lightgray",
//               borderRadius: "8px",
//               textAlign: "center",
//               py: 1.5,
//             }}
//           >
//             <Typography fontWeight="bold">OR Login With</Typography>
//             <Box mt={1}>
//               <Facebook sx={{ fontSize: 30, mx: 1, cursor: "pointer", color: "#1877F2" }} />
//               <Google sx={{ fontSize: 30, mx: 1, cursor: "pointer", color: "#DB4437" }} />
//               <GitHub sx={{ fontSize: 30, mx: 1, cursor: "pointer", color: "black" }} />
//               <Twitter sx={{ fontSize: 30, mx: 1, cursor: "pointer", color: "#1DA1F2" }} />
//             </Box>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   FormControlLabel,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { AccountCircle } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:2000/api/User/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) throw new Error("Login failed");

//       const data = await response.json();

//       if (!data.role) {
//         toast.warning("No Role Assigned. Redirecting to Website...", {
//           position: "top-center",
//         });
//         setTimeout(() => {
//           window.location.href = "/"; // Redirect to website
//         }, 2000);
//       } else {
//         toast.success("Login Successful!", { position: "top-center" });
//         setTimeout(() => {
//           navigate("/dashboard"); // Redirect based on role if needed
//         }, 2000);
//       }
//     } catch (error) {
//       toast.error("Invalid Credentials. Please try again.");
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
//         <Paper elevation={10} sx={{ padding: "40px", borderRadius: "15px" }}>
//           <Box textAlign="center">
//             <AccountCircle sx={{ fontSize: 60, color: "#000080" }} />
//             <Typography variant="h3" fontWeight="bold" mt={1}>
//               Login
//             </Typography>
//           </Box>

//           <form onSubmit={handleSubmit}>
//             <TextField
//               required
//               name="email"
//               label="Email Address"
//               type="email"
//               fullWidth
//               placeholder="Enter Email"
//               sx={{ my: 2 }}
//               value={credentials.email}
//               onChange={handleChange}
//             />
//             <TextField
//               required
//               name="password"
//               label="Password"
//               type="password"
//               fullWidth
//               placeholder="Enter Password"
//               sx={{ mb: 2 }}
//               value={credentials.password}
//               onChange={handleChange}
//             />

//             <FormControlLabel control={<Checkbox />} label="Remember Me" />

//             <Typography textAlign="right" sx={{ cursor: "pointer", mb: 2, color: "blue" }}>
//               <b>Forgot Your Password?</b>
//             </Typography>

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
//               Login
//             </Button>
//           </form>

//           <Typography color="gray" textAlign="center" my={2}>
//             Don't Have An Account? <b style={{ color: "#6a11cb" }}> <Link to={"/register"}>Signup</Link></b>
//           </Typography>
//         </Paper>
//       </Container>
//       <ToastContainer />
//     </Box>
//   );
// };

// export default Login;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
=======
import { Lock } from "@mui/icons-material";
import { Link,useNavigate, useLocation } from "react-router-dom";
>>>>>>> Stashed changes
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const [credentials, setCredentials] = useState({ email: "", password: "" });
=======
  const location = useLocation();
  const isDashboard = location.pathname.includes("dashboard");

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: isDashboard ? "Staff" : "Guest",
  });
>>>>>>> Stashed changes

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

      if (!response.ok) throw new Error("Login failed");

<<<<<<< Updated upstream
      const data = await response.json();

      if (!data.role) {
        toast.warning("No Role Assigned. Redirecting to Website...", {
          position: "top-center",
        });
        setTimeout(() => {
          window.location.href = "/"; // Redirect to website
        }, 2000);
      } else {
        toast.success("Login Successful!", { position: "top-center" });
        setTimeout(() => {
          navigate("/dashboard"); // Redirect based on role if needed
        }, 2000);
      }
    } catch (error) {
      toast.error("Invalid Credentials. Please try again.");
=======
      toast.success("Login Successful! Redirecting...", {
        position: "top-center",
      });

      setTimeout(() => {
        if (credentials.role === "Guest") {
          navigate("/"); // Redirect to homepage
        } else {
          navigate("/dashboard"); // Redirect to dashboard for Admin/Staff
        }
      }, 2000);
    } catch (error) {
      toast.error("Login Failed. Please check your credentials.");
>>>>>>> Stashed changes
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ padding: "40px", borderRadius: "15px" }}>
          <Box textAlign="center">
<<<<<<< Updated upstream
            <AccountCircle sx={{ fontSize: 60, color: "#000080" }} />
=======
            <Lock sx={{ fontSize: 60, color: "#000080" }} />
>>>>>>> Stashed changes
            <Typography variant="h3" fontWeight="bold" mt={1}>
              Login
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
<<<<<<< Updated upstream
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

          <Typography color="gray" textAlign="center" my={2}>
            Don't Have An Account? <b style={{ color: "#6a11cb" }}> <Link to={"/register"}>Signup</Link></b>
=======
            <TextField required name="email" label="Email" type="email" fullWidth sx={{ my: 2 }} value={credentials.email} onChange={handleChange} />
            <TextField required name="password" label="Password" type="password" fullWidth sx={{ my: 2 }} value={credentials.password} onChange={handleChange} />

            {isDashboard && (
              <TextField select name="role" label="Role" fullWidth sx={{ my: 2 }} value={credentials.role} onChange={handleChange}>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </TextField>
            )}

            <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: "#000080", color: "white" }}>Login</Button>
          </form>

          <Typography textAlign="center" my={2}>
            Don't have an account? <Link to="/register">Register</Link>
>>>>>>> Stashed changes
          </Typography>
        </Paper>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default Login;
