import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StaffDashboard = () => {
  const [bookingData, setBookingData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);

  // Fetch data from MongoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bookings
        const bookingsResponse = await axios.get("http://localhost:2000/api/booking/get-booking");
        console.log("Bookings API Response:", bookingsResponse.data); // Debugging

        // Fetch transactions
        const transactionsResponse = await axios.get("http://localhost:2000/api/billing/all");
        console.log("Transactions API Response:", transactionsResponse.data); // Debugging

        // Ensure bookingData is an array
        const bookings = Array.isArray(bookingsResponse.data) ? bookingsResponse.data : [];
        setBookingData(bookings);

        // Ensure transactionData is an array
        const transactions = Array.isArray(transactionsResponse.data) ? transactionsResponse.data : [];
        setTransactionData(transactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Data for the bar chart
  const chartData = {
    labels: ["Bookings", "Transactions"],
    datasets: [
      {
        label: "Count",
        data: [bookingData.length, transactionData.length],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  console.log("Chart Data:", chartData); // Debugging

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bookings vs Transactions",
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
        Staff Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Card 1: Total Bookings */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Bookings
              </Typography>
              <Typography variant="h4">{bookingData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Total Transactions */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Transactions
              </Typography>
              <Typography variant="h4">{transactionData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bookings vs Transactions
              </Typography>
              <Bar data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StaffDashboard;