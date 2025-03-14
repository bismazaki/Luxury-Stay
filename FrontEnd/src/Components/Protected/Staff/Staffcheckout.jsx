import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Typography, TextField, Button, Select, MenuItem, Card, CardContent, Grid } from "@mui/material";

const Staffcheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId = "", guestId = "", guestName = "", checkInDate = "", checkOutDate = "", totalAmount = "" } = location.state || {};

  const [paymentData, setPaymentData] = useState({
    userId: guestId,
    amount: totalAmount,
    method: "Card",
    cardNumber: "",
    cardHolderName: "",
    status: "Pending",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (paymentData.method === "Card" && (!paymentData.cardNumber || !paymentData.cardHolderName)) {
      toast.error("Please fill in card details.", { autoClose: 2000 });
      setIsLoading(false);
      return;
    }

    if (!roomId || !guestName || !checkInDate || !checkOutDate) {
      toast.error("Missing required fields. Please fill all details.", { autoClose: 2000 });
      setIsLoading(false);
      return;
    }

    let finalPaymentData = {
      roomId,
      guestName,
      checkInDate,
      checkOutDate,
      userId: paymentData.userId,
      amount: paymentData.amount,
      method: paymentData.method,
      status: paymentData.method === "Cash" ? "Completed" : "Pending",
    };

    if (paymentData.method === "Card") {
      finalPaymentData.cardNumber = paymentData.cardNumber;
      finalPaymentData.cardHolderName = paymentData.cardHolderName;
    }

    try {
      const res = await axios.post("http://localhost:2000/api/payment/create-payments", finalPaymentData);
      if (res.data.message.includes("Payment successful")) {
        toast.success("Payment successful!", { autoClose: 2000 });

        const billingData = {
          GuestId: paymentData.userId,
          Guestname: guestName, // Use the guestName from location.state
          BookingId: roomId,
          ServiceCharges: "Food",
          TotalAmount: paymentData.amount,
          PaymentMode: paymentData.method,
        };

        const billingRes = await axios.post("http://localhost:2000/api/billing/create-billing", billingData);
        toast.success("Billing Created! Redirecting...", { autoClose: 2000 });

        setTimeout(() => {
          navigate("/staff-dashboard/staffconfirmation", {
            state: {
              ...billingRes.data.billing,
              Guestname: guestName, // Pass the correct guestName
            },
          });
        }, 2000);
      } else {
        toast.error("Payment was not successful.", { autoClose: 2000 });
      }
    } catch (err) {
      console.error("Payment error:", err.response ? err.response.data : err.message);
      toast.error("Payment failed. Please try again.", { autoClose: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 5, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Checkout
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Guest Name" value={guestName} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Check-in Date" value={checkInDate} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Check-out Date" value={checkOutDate} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Total Amount" value={`$${totalAmount}`} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <Select fullWidth name="method" value={paymentData.method} onChange={handleChange}>
                <MenuItem value="Card">Card</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </Select>
            </Grid>

            {paymentData.method === "Card" && (
              <>
                <Grid item xs={12}>
                  <TextField fullWidth label="Card Number" name="cardNumber" onChange={handleChange} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Card Holder Name" name="cardHolderName" onChange={handleChange} required />
                </Grid>
              </>
            )}

            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, borderRadius: 25 }}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Proceed to Pay"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Staffcheckout;