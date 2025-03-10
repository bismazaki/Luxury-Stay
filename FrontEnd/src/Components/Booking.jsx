import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Box,
    Grid
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Booking = () => {
    const location = useLocation();
    const { id: roomId, roomType, pricePerNight, image } = location.state || {};

    const [guestName, setGuestName] = useState("");
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const calculateTotalAmount = () => {
        if (!checkInDate || !checkOutDate) return 0;
        const nights = Math.max(0, checkOutDate.diff(checkInDate, "day"));
        return nights * pricePerNight;
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!guestName || !checkInDate || !checkOutDate) {
            setMessage("Please fill all fields.");
            return;
        }

        const totalAmount = calculateTotalAmount();
        if (totalAmount <= 0) {
            setMessage("Check-out date must be after check-in date.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post("http://localhost:2000/api/booking/create-booking", {
                guestId: "65a8b8b8c9e77c1f9d1a1b2c", 
                roomId,
                checkInDate: checkInDate.format("YYYY-MM-DD"),
                checkOutDate: checkOutDate.format("YYYY-MM-DD"),
                totalAmount,
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
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
                                <Typography variant="h6" color="primary">
                                    {roomType}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" mb={2}>
                                    Price per Night: <strong>${pricePerNight}</strong>
                                </Typography>

                                <form onSubmit={handleBooking}>
                                    <TextField
                                        fullWidth
                                        label="Your Name"
                                        variant="outlined"
                                        margin="normal"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                    />

                                    {/* <DatePicker
                                        label="Check-in Date"
                                        value={checkInDate}
                                        onChange={(date) => setCheckInDate(date)}
                                        renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                                    />

                                    <DatePicker
                                        label="Check-out Date"
                                        value={checkOutDate}
                                        onChange={(date) => setCheckOutDate(date)}
                                        renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                                    /> */}

<LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
        label="Check-in Date"
        value={checkInDate}
        onChange={(date) => setCheckInDate(date)}
        renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
    />

    <DatePicker
        label="Check-out Date"
        value={checkOutDate}
        onChange={(date) => setCheckOutDate(date)}
        renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
    />
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
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            sx={{ borderRadius: 25, padding: "10px 30px" }}
                                        >
                                            {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm Booking"}
                                        </Button>
                                    </Box>
                                </form>
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
