// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
// import { useState } from "react";
import { AppBar, Toolbar, Button, Container, Paper, Typography, TextField, Box, Drawer, List, ListItem, ListItemText } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="md" sx={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h3" gutterBottom>Welcome to Our Platform</Typography>
      <Typography variant="h6" paragraph>Your journey starts here.</Typography>
      <Button variant="contained"  to="/login">Get Started</Button>
    </Container>
  );
}
export default Home;