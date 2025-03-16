// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Alert, Box } from "@mui/material";

// const BookingHistory = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const token = localStorage.getItem("token_guest");
//                 const res = await axios.get("http://localhost:2000/api/booking/booking-history", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 setBookings(res.data.bookings);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.response?.data?.message || "Failed to fetch bookings");
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     // const handleCancelBooking = async (bookingId) => {
//     //     try {
//     //         const token = localStorage.getItem("token_guest");
//     //         await axios.delete(`http://localhost:2000/api/booking/cancel/${bookingId}`, {
//     //             headers: { Authorization: `Bearer ${token}` }
//     //         });
            
//     //         setBookings(bookings.filter(booking => booking._id !== bookingId));
//     //     } catch (err) {
//     //         alert("Failed to cancel booking");
//     //     }
//     // };
//     const handleCancelBooking = async (bookingId) => {
//       try {
//           const token = localStorage.getItem("token_guest");
  
//           await axios.delete(`http://localhost:2000/api/booking/update/${bookingId}/cancel`, {
//               headers: { Authorization: `Bearer ${token}` }
//           });
  
//           // Update UI by changing booking status to "Cancelled"
//           setBookings(bookings.map(booking => 
//               booking._id === bookingId ? { ...booking, status: "Cancelled" } : booking
//           ));
  
//           alert("Booking cancelled successfully");
//       } catch (err) {
//           alert(err.response?.data?.message || "Failed to cancel booking");
//       }
//   };
  
  
//     return (
//         <Container maxWidth="lg" sx={{ mt: 4 }}>
//             <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
//                 Booking History
//             </Typography>

//             {loading ? (
//                 <Box display="flex" justifyContent="center" mt={3}><CircularProgress /></Box>
//             ) : error ? (
//                 <Alert severity="error">{error}</Alert>
//             ) : bookings.length === 0 ? (
//                 <Alert severity="info">No bookings found.</Alert>
//             ) : (
//                 <TableContainer component={Paper} elevation={3}>
//                     <Table>
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                                 <TableCell><b>Room Type</b></TableCell>
//                                 <TableCell><b>Room Image</b></TableCell>
//                                 <TableCell><b>Price Per Night</b></TableCell>
//                                 <TableCell><b>Check-In</b></TableCell>
//                                 <TableCell><b>Check-Out</b></TableCell>
//                                 <TableCell><b>Total Amount</b></TableCell>
//                                 <TableCell><b>Payment Status</b></TableCell>
//                                 <TableCell><b>Action</b></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {bookings.map((booking) => (
//                                 <TableRow key={booking._id}>
//                                     <TableCell>{booking.roomId?.roomType || "Unavailable"}</TableCell>
//                                     <TableCell>
//                                         <img src={booking.roomId?.image || "https://via.placeholder.com/100"} alt="Room" height={50} width={80} style={{ borderRadius: 5 }} />
//                                     </TableCell>
//                                     <TableCell>${booking.roomId?.pricePerNight || "N/A"}</TableCell>
//                                     <TableCell>{new Date(booking.checkInDate).toLocaleDateString()}</TableCell>
//                                     <TableCell>{new Date(booking.checkOutDate).toLocaleDateString()}</TableCell>
//                                     <TableCell>${booking.totalAmount || "N/A"}</TableCell>
//                                     <TableCell>{booking.paymentStatus || "N/A"}</TableCell>
//                                     <TableCell>
//                                         <Button 
//                                             variant="contained" 
//                                             color="error" 
//                                             size="small" 
//                                             onClick={() => handleCancelBooking(booking._id)}
//                                         >
//                                             Cancel Booking
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </Container>
//     );
// };

// export default BookingHistory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Alert,
    Box
} from "@mui/material";

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token_guest");
                const res = await axios.get("http://localhost:2000/api/booking/booking-history", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setBookings(res.data.bookings);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch bookings");
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem("token_guest");

            await axios.delete(`http://localhost:2000/api/booking/update/${bookingId}/cancel`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update UI by changing booking status to "Cancelled"
            setBookings(bookings.map(booking =>
                booking._id === bookingId ? { ...booking, status: "Cancelled" } : booking
            ));

            alert("Booking cancelled successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to cancel booking");
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
                Booking History
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={3}><CircularProgress /></Box>
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : bookings.length === 0 ? (
                <Alert severity="info">No bookings found.</Alert>
            ) : (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell><b>Room Type</b></TableCell>
                                <TableCell><b>Room Image</b></TableCell>
                                <TableCell><b>Price Per Night</b></TableCell>
                                <TableCell><b>Check-In</b></TableCell>
                                <TableCell><b>Check-Out</b></TableCell>
                                <TableCell><b>Total Amount</b></TableCell>
                                <TableCell><b>Payment Status</b></TableCell>
                                <TableCell><b>Action</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((booking) => {
                                const checkOutDate = new Date(booking.checkOutDate);
                                const today = new Date();
                                const isPastDate = checkOutDate < today; // ✅ Check if checkout date has passed

                                return (
                                    <TableRow key={booking._id}>
                                        <TableCell>{booking.roomId?.roomType || "Unavailable"}</TableCell>
                                        <TableCell>
                                            <img 
                                                src={booking.roomId?.image || "https://via.placeholder.com/100"} 
                                                alt="Room" 
                                                height={50} 
                                                width={80} 
                                                style={{ borderRadius: 5 }} 
                                            />
                                        </TableCell>
                                        <TableCell>${booking.roomId?.pricePerNight || "N/A"}</TableCell>
                                        <TableCell>{new Date(booking.checkInDate).toLocaleDateString()}</TableCell>
                                        <TableCell>{checkOutDate.toLocaleDateString()}</TableCell>
                                        <TableCell>${booking.totalAmount || "N/A"}</TableCell>
                                        <TableCell>{booking.paymentStatus || "N/A"}</TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="contained" 
                                                color="error" 
                                                size="small" 
                                                onClick={() => handleCancelBooking(booking._id)}
                                                disabled={isPastDate} // ✅ Disable button if checkout date has passed
                                            >
                                                Cancel Booking
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default BookingHistory;
