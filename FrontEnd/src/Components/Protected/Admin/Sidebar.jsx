import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Menu,
    MenuItem,
    AppBar,
    Toolbar,
    Box,
    Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // Sidebar toggle
    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Profile Dropdown toggle
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {/* Header with Navy Blue Background & 100px Height */}
            <AppBar
                position="fixed"  // Yeh fix karega top pe
                sx={{
                    margin: 0,
                    padding: 0,
                    bgcolor: "navy",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        {/* Left Toggle Icon */}
                        <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
                            <MenuIcon fontSize="large" />
                        </IconButton>

                        {/* Right Profile Icon */}
                        <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
                            <AccountCircleIcon fontSize="large" />
                        </IconButton>

                        {/* Profile Dropdown Menu */}
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            <MenuItem onClick={handleMenuClose} component={Link} to="/settings">
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                <Box sx={{ width: 250, background: "navy", height: "100vh", color: "white", padding: "20px" }}>
                    {/* Close Button */}
                    <IconButton onClick={toggleDrawer} sx={{ color: "#fff", float: "right" }}>
                        <CloseIcon />
                    </IconButton>

                    <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>

                    <List>
                        <ListItem button onClick={toggleDrawer} component={Link} to="/admin-dashboard">
                            <ListItemText sx={{color: `white`}} primary="Dashboard" />
                        </ListItem>
                        <ListItem button onClick={toggleDrawer} component={Link} to="staff-requests">
                            <ListItemText sx={{color: `white`}} primary="Staff Requests" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar;
