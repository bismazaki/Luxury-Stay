import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { InvoiceId, GuestId, Guestname, BookingId, ServiceCharges, TotalAmount, PaymentMode, InvoiceDate } =
    location.state || {};

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 6, borderRadius: 3, textAlign: "center", p: 3 }}>
        <CardContent>
          <CheckCircleIcon sx={{ fontSize: 80, color: "green", mb: 2 }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom color="green">
            Payment Successful!
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Invoice ID:</strong> {InvoiceId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Guest ID:</strong> {GuestId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Guest Name:</strong> {Guestname}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Booking ID:</strong> {BookingId}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Service Charges:</strong> {ServiceCharges}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Total Amount:</strong> ${TotalAmount}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Payment Mode:</strong> {PaymentMode}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <strong>Invoice Date:</strong> {new Date(InvoiceDate).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 20, px: 4, py: 1 }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ConfirmationPage;
