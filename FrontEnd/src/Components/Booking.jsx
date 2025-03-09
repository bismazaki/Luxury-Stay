import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Booking = () => {
    const location = useLocation();
    const { id: roomId, roomType, pricePerNight, image } = location.state || {};

    // State for form inputs
    const [guestName, setGuestName] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Calculate total amount based on price per night
    const calculateTotalAmount = () => {
        if (!checkInDate || !checkOutDate) return 0;
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.max(0, (checkOut - checkIn) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return nights * pricePerNight;
    };

    // Handle form submission
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
            const response = await axios.post("http://localhost:2000/api/booking/booking", {
                guestId: "65a8b8b8c9e77c1f9d1a1b2c", // Replace with actual guest ID from auth
                roomId,
                checkInDate,
                checkOutDate,
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
        <div className="container">
            <h2 className="my-4">Booking Form</h2>

            {roomType ? (
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={image}
                            alt={roomType}
                            style={{ width: "100%", height: "300px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <form onSubmit={handleBooking}>
                            <div className="mb-3">
                                <label className="form-label">Room Type</label>
                                <input type="text" className="form-control" value={roomType} readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price Per Night</label>
                                <input type="text" className="form-control" value={`$${pricePerNight}`} readOnly />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Your Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Check-in Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Check-out Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Total Amount</label>
                                <input type="text" className="form-control" value={`$${calculateTotalAmount()}`} readOnly />
                            </div>
                            {message && <p className="text-danger">{message}</p>}
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Processing..." : "Confirm Booking"}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <p>No room details found.</p>
            )}
        </div>
    );
};

export default Booking;
