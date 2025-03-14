import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Container, Grid, Paper, Typography, Card, CardContent } from "@mui/material";

// ✅ Required scales ko register karo
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Admindashboard = () => {
  const [totals, setTotals] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalStaff: 0,
    totalGuests: 0,
    totalFeedbacks: 0,
  });

  useEffect(() => {
    fetch("http://localhost:2000/api/report/totals")
      .then((res) => res.json())
      .then((data) => setTotals(data))
      .catch((err) => console.error("Error fetching totals:", err));
  }, []);

  const data = {
    labels: ["Bookings", "Users", "Staff", "Guests", "Feedbacks"],
    datasets: [
      {
        label: "Total Count",
        data: [
          totals.totalBookings,
          totals.totalUsers,
          totals.totalStaff,
          totals.totalGuests,
          totals.totalFeedbacks,
        ],
        backgroundColor: ["#1E3A8A", "#0D9488", "#4338CA", "#374151", "#F97316"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      {/* Dashboard Title */}
      <Typography variant="h2" sx={{ textAlign: "center",fontFamily: 'serif', fontWeight: "bold", mt: 4, mb: 4 }}>
        Admin Dashboard
      </Typography>

      {/* Cards Section */}
      <Grid container spacing={3}>
        {[
          { label: "Bookings", count: totals.totalBookings, color: "#1E3A8A" }, // Navy Blue
          { label: "Users", count: totals.totalUsers, color: "#0D9488" }, // Teal
          { label: "Staff", count: totals.totalStaff, color: "#4338CA" }, // Indigo
          { label: "Guests", count: totals.totalGuests, color: "#374151" }, // Grey
          { label: "Feedbacks", count: totals.totalFeedbacks, color: "#F97316" }, // Deep Orange
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card sx={{ backgroundColor: item.color, color: "#fff", textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.label}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
                  {item.count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Chart Section */}
      <Paper sx={{ mt: 4, p: 3, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Overview
        </Typography>
        <Bar data={data} />
      </Paper>
    </Container>
  );
};

export default Admindashboard;
