
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import {
    Container, Card, CardMedia, CardContent, Typography,
    TextField, Button, Box, Grid
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthContext } from "./AuthContext";

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id: roomId, roomType, pricePerNight, image } = location.state || {};
    const { guestName, token } = useContext(AuthContext);
    const gName = guestName || "Guest";

    let guestId = "GUEST_" + Math.random().toString(36).substr(2, 9);
    if (token) {
        try {
            const decoded = jwtDecode(token);
            guestId = decoded?.user?.id || guestId;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [message, setMessage] = useState("");

    const today = dayjs(); // Aaj ki date

    const shouldDisableDate = (date) => {
        return date.isBefore(today, "day"); // Sirf past dates disable hongi
    };

    const calculateTotalAmount = () => {
        if (!checkInDate || !checkOutDate) return 0;
        const nights = Math.max(0, checkOutDate.diff(checkInDate, "day"));
        return nights * pricePerNight;
    };

    const handleProceedToPayment = (e) => {
        e.preventDefault();

        if (!checkInDate || !checkOutDate) {
            setMessage("Please select check-in and check-out dates.");
            return;
        }

        if (checkOutDate.isBefore(checkInDate, "day")) {
            setMessage("Check-out date must be after check-in date.");
            return;
        }

        const totalAmount = calculateTotalAmount();
        if (totalAmount <= 0) {
            setMessage("Check-out date must be after check-in date.");
            return;
        }

        navigate("/payment", {
            state: {
                roomId,
                guestId,
                guestName: gName,
                checkInDate: checkInDate.format("YYYY-MM-DD"),
                checkOutDate: checkOutDate.format("YYYY-MM-DD"),
                totalAmount,
            },
        });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                Book Your Stay
            </Typography>

            {roomType ? (
                <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={image}
                                alt={roomType}
                                sx={{ borderRadius: "8px 0 0 8px", objectFit: "cover" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CardContent>
                                <Typography variant="h6" color="primary">{roomType}</Typography>
                                <Typography variant="subtitle1" color="textSecondary" mb={2}>
                                    Price per Night: <strong>${pricePerNight}</strong>
                                </Typography>

                                <TextField
                                    fullWidth
                                    label="Guest Name"
                                    variant="outlined"
                                    margin="normal"
                                    value={gName}
                                    InputProps={{ readOnly: true }}
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                label="Check-in Date"
                                                value={checkInDate}
                                                onChange={(date) => {
                                                    setCheckInDate(date);
                                                    setCheckOutDate(null); // Reset check-out date when check-in changes
                                                }}
                                                shouldDisableDate={shouldDisableDate} // ✅ Past dates disabled
                                                slotProps={{ textField: { fullWidth: true } }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <DatePicker
                                                label="Check-out Date"
                                                value={checkOutDate}
                                                onChange={setCheckOutDate}
                                                shouldDisableDate={(date) =>
                                                    shouldDisableDate(date) ||
                                                    (checkInDate && date.isBefore(checkInDate, "day")) // ✅ Must be after check-in
                                                }
                                                slotProps={{ textField: { fullWidth: true } }}
                                            />
                                        </Grid>
                                    </Grid>
                                </LocalizationProvider>

                                <TextField
                                    fullWidth
                                    label="Total Amount"
                                    variant="outlined"
                                    margin="normal"
                                    value={`$${calculateTotalAmount()}`}
                                    InputProps={{ readOnly: true }}
                                />

                                {message && <Typography color="error" mt={1}>{message}</Typography>}

                                <Box mt={2} textAlign="center">
                                    <Button
                                        onClick={handleProceedToPayment}
                                        variant="contained"
                                        color="primary"
                                        sx={{ borderRadius: 25, padding: "10px 30px" }}
                                    >
                                        Proceed to Payment
                                    </Button>
                                </Box>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            ) : (
                <Typography textAlign="center" color="error">
                    No room details found.
                </Typography>
            )}
        </Container>
    );
};

export default Booking;
