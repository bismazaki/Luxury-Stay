import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // ✅ Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("http://localhost:2000/api/feedback/get-feedback");
      setFeedbacks(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setLoading(false);
    }
  };

  // ✅ Update feedback response status
  const updateResponseStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:2000/api/feedback/feedback/${id}`, { responseStatus: status });
      fetchFeedbacks(); // Refresh list
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  // ✅ Delete feedback
  const deleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await axios.delete(`http://localhost:2000/api/feedback/feedback/${id}`);
      fetchFeedbacks(); // Refresh list
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  if (loading)
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Feedbacks...
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        Feedback Management
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Guest Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Service Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rating</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Comments</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback._id} hover>
                <TableCell>{feedback.guestId?.name || "Unknown"}</TableCell>
                <TableCell>{feedback.serviceType}</TableCell>
                <TableCell>{feedback.rating}</TableCell>
                <TableCell>{feedback.comments}</TableCell>
                <TableCell>
                  <Select
                    value={feedback.responseStatus}
                    onChange={(e) => updateResponseStatus(feedback._id, e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="Pending">
                      <PendingActionsIcon sx={{ color: "orange", mr: 1 }} />
                      Pending
                    </MenuItem>
                    <MenuItem value="Responded">
                      <CheckIcon sx={{ color: "green", mr: 1 }} />
                      Responded
                    </MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteFeedback(feedback._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FeedbackManagement;
