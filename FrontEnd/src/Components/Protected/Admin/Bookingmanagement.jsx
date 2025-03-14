import React, { useEffect, useState } from "react";
import { 
    Container, Typography, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Button, Dialog, DialogActions, 
    DialogContent, DialogTitle, TextField 
} from "@mui/material";
import axios from "axios";

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:2000/api/booking/get-booking");
            setBookings(response.data.bookings);
        } catch (error) {
            console.error("Error fetching bookings", error);
        }
    };


    const handleEditClick = (booking) => {
        console.log("Selected Booking:", booking);
        console.log("Room Details:", booking.roomId);
    
        setSelectedBooking({
            ...booking,
            checkInDate: booking.checkInDate.split("T")[0],  
            checkOutDate: booking.checkOutDate.split("T")[0],
            pricePerNight: booking.roomId?.pricePerNight || 0, // ✅ Actual price set karo
        });
    
        setOpenEdit(true);
    };
    


// Function to calculate the total amount dynamically
const calculateTotalAmount = (checkIn, checkOut, pricePerNight) => {
  if (!checkIn || !checkOut || !pricePerNight) return 0;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.max(1, (checkOutDate - checkInDate) / (1000 * 3600 * 24)); // At least 1 night charge

  return nights * pricePerNight;
};
const handleDateChange = (e, field) => {
    const value = e.target.value;
    const updatedBooking = { ...selectedBooking, [field]: value };

    if (updatedBooking.checkInDate && updatedBooking.checkOutDate) {
        updatedBooking.totalAmount = calculateTotalAmount(
            updatedBooking.checkInDate,
            updatedBooking.checkOutDate,
            updatedBooking.pricePerNight // ✅ Ensure correct price
        );
    }

    setSelectedBooking(updatedBooking);
};


  
const handleEditSave = async () => {
    const token = localStorage.getItem("token_admin");
    if (!token) {
        console.error("No token found");
        return;
    }

    try {
        const response = await axios.put(
            `http://localhost:2000/api/booking/update/${selectedBooking._id}`,
            {
                checkInDate: selectedBooking.checkInDate,
                checkOutDate: selectedBooking.checkOutDate
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Updated Booking Response:", response.data);
        fetchBookings(); 
        setOpenEdit(false);
    } catch (error) {
        console.error("Error updating booking", error.response?.data || error.message);
    }
};

  
    const handleCancelBooking = async (id) => {
        const token = localStorage.getItem("token_admin");
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            await axios.delete(
                `http://localhost:2000/api/booking/delete/${id}/cancel`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchBookings();
        } catch (error) {
            console.error("Error canceling booking", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>Booking Management</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Guest Name</TableCell>
                            <TableCell>Room Type</TableCell>
                            <TableCell>Check-In</TableCell>
                            <TableCell>Check-Out</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.guestName || "N/A"}</TableCell> 
                                <TableCell>{booking.roomId ? booking.roomId.roomType : "N/A"}</TableCell>
                                <TableCell>{booking.checkInDate.split("T")[0]}</TableCell>
                                <TableCell>{booking.checkOutDate.split("T")[0]}</TableCell>
                                <TableCell>${booking.totalAmount}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => handleEditClick(booking)}>Edit</Button>
                                    <Button color="error" onClick={() => handleCancelBooking(booking._id)}>Cancel</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Booking Dialog */}
            {selectedBooking && (
                <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                    <DialogTitle>Edit Booking</DialogTitle>
                    <DialogContent>
                        <TextField 
                            fullWidth margin="dense" label="Check-In Date" type="date"
                            value={selectedBooking.checkInDate} 
                            onChange={(e) => handleDateChange(e, "checkInDate")} 
                        />
                        <TextField 
                            fullWidth margin="dense" label="Check-Out Date" type="date"
                            value={selectedBooking.checkOutDate} 
                            onChange={(e) => handleDateChange(e, "checkOutDate")} 
                        />
                        <TextField 
                            fullWidth margin="dense" label="Total Amount" type="number" disabled
                            value={selectedBooking.totalAmount} 
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
                        <Button color="primary" onClick={handleEditSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default BookingManagement;
