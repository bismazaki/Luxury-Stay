import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle, Facebook, GitHub, Google, Twitter } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to right,rgba(178, 167, 190, 0.25),rgba(11, 37, 84, 0.13))",
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
            <Typography variant="h3" fontFamily={"'Cinzel', serif"} fontWeight="bold" mt={1}>
              Login
            </Typography>
          </Box>

          {/* Input Fields */}
          <TextField
            required
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
            placeholder="Enter Email"
            sx={{ my: 2, borderRadius: "8px" }}
          />
          <TextField
            required
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            placeholder="Enter Password"
            sx={{ mb: 2, borderRadius: "8px" }}
          />

          <FormControlLabel control={<Checkbox />} label="Remember Me" />

          <Typography textAlign="right" sx={{ cursor: "pointer", mb: 2 , color: 'blue' }}>
            <b>Forgot Your Password?</b>
          </Typography>

          {/* Login Button */}
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

          <Typography color="gray" textAlign="center" my={2}>
            Don't Have An Account? <b style={{ color: "#6a11cb", cursor: "pointer" }}> <Link to={'/register'}> Signup</Link></b>
          </Typography>

          {/* Social Media Login */}
          <Box
            sx={{
              backgroundColor: "lightgray",
              borderRadius: "8px",
              textAlign: "center",
              py: 1.5,
            }}
          >
            <Typography fontWeight="bold">OR Login With</Typography>
            <Box mt={1}>
              <Facebook sx={{ fontSize: 30, mx: 1, cursor: "pointer", color: "#1877F2" }} />
              <Google sx={{ fontSize: 30, mx: 1, cursor: "pointer", color: "#DB4437" }} />
              <GitHub sx={{ fontSize: 30, mx: 1, cursor: "pointer", color: "black" }} />
              <Twitter sx={{ fontSize: 30, mx: 1, cursor: "pointer", color: "#1DA1F2" }} />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
