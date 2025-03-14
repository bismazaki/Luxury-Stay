// import React, { useEffect, useState } from "react";
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
// import axios from "axios";

// const StaffPanel = () => {
//     const [bookings, setBookings] = useState([]);
//     const [error, setError] = useState("");

//     // Fetch all bookings
//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const response = await axios.get("http://localhost:2000/api/booking/get-booking");
//                 setBookings(response.data.bookings);
//             } catch (err) {
//                 setError(err.response?.data?.message || "Failed to fetch bookings");
//             }
//         };
//         fetchBookings();
//     }, []);

//     // Handle check-in
//     const handleCheckIn = async (bookingId) => {
//         try {
//             await axios.put(`http://localhost:2000/api/booking/${bookingId}/check-in`);
//             alert("Guest checked in successfully!");
//             // Refresh the bookings list
//             const response = await axios.get("http://localhost:2000/api/booking/get-booking");
//             setBookings(response.data.bookings);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to check in guest");
//         }
//     };

//     // Handle check-out
//     const handleCheckOut = async (bookingId) => {
//         try {
//             await axios.put(`http://localhost:2000/api/booking/${bookingId}/check-out`);
//             alert("Guest checked out successfully!");
//             // Refresh the bookings list
//             const response = await axios.get("http://localhost:2000/api/booking/get-booking");
//             setBookings(response.data.bookings);
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to check out guest");
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>
//                 Staff Panel - Guest Check-In/Check-Out
//             </Typography>
//             {error && <Typography color="error">{error}</Typography>}
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Guest Name</TableCell>
//                             <TableCell>Room Type</TableCell>
//                             <TableCell>Check-In Date</TableCell>
//                             <TableCell>Check-Out Date</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {bookings.map((booking) => (
//                             <TableRow key={booking._id}>
//                                 <TableCell>{booking.guestName}</TableCell>
//                                 <TableCell>{booking.roomId?.roomType}</TableCell>
//                                 <TableCell>{new Date(booking.checkInDate).toLocaleDateString()}</TableCell>
//                                 <TableCell>{new Date(booking.checkOutDate).toLocaleDateString()}</TableCell>
//                                 <TableCell>{booking.paymentStatus}</TableCell>
//                                 <TableCell>
//                                     {booking.status === "Confirmed" && (
//                                         <Button
//                                             variant="contained"
//                                             color="primary"
//                                             onClick={() => handleCheckIn(booking._id)}
//                                         >
//                                             Check-In
//                                         </Button>
//                                     )}
//                                     {booking.status === "Checked-In" && (
//                                         <Button
//                                             variant="contained"
//                                             color="secondary"
//                                             onClick={() => handleCheckOut(booking._id)}
//                                         >
//                                             Check-Out
//                                         </Button>
//                                     )}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default StaffPanel;


import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";

const StaffPanel = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");

    // Fetch all bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:2000/api/booking/get-booking");
                setBookings(response.data.bookings);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch bookings");
            }
        };
        fetchBookings();
    }, []);

    // Handle check-in
    const handleCheckIn = async (bookingId) => {
        try {
            await axios.put(`http://localhost:2000/api/booking/${bookingId}/check-in`);
            alert("Guest checked in successfully!");
            // Refresh the bookings list
            const response = await axios.get("http://localhost:2000/api/booking/get-booking");
            setBookings(response.data.bookings);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to check in guest");
        }
    };

    // Handle check-out
    const handleCheckOut = async (bookingId) => {
        try {
            await axios.put(`http://localhost:2000/api/booking/${bookingId}/check-out`);
            alert("Guest checked out successfully!");
            // Refresh the bookings list
            const response = await axios.get("http://localhost:2000/api/booking/get-booking");
            setBookings(response.data.bookings);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to check out guest");
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Staff Panel - Guest Check-In/Check-Out
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Guest Name</TableCell>
                            <TableCell>Room Type</TableCell>
                            <TableCell>Check-In Date</TableCell>
                            <TableCell>Check-Out Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map((booking) => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.guestName}</TableCell>
                                <TableCell>{booking.roomId?.roomType}</TableCell>
                                <TableCell>{new Date(booking.checkInDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(booking.checkOutDate).toLocaleDateString()}</TableCell>
                                <TableCell>{booking.status}</TableCell>
                                <TableCell>
                                    {booking.status === "Confirmed" && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleCheckIn(booking._id)}
                                        >
                                            Check-In
                                        </Button>
                                    )}
                                    {booking.status === "Checked-In" && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleCheckOut(booking._id)}
                                        >
                                            Check-Out
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default StaffPanel;