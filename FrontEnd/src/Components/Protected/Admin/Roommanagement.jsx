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
  Box,
  Modal,
  TextField,
} from "@mui/material";
import { Delete, Add, Edit } from "@mui/icons-material";

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [roomData, setRoomData] = useState({
    roomId: "",
    roomType: "Single",
    pricePerNight: "",
    availabilityStatus: "Available",
    housekeepingStatus: "Cleaned",
    image: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/Room/getrooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`http://localhost:2000/api/Room/deleteroom/${roomId}`);
      fetchRooms();
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleAddOrUpdateRoom = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:2000/api/Room/updateroom/${selectedRoomId}`, roomData);
      } else {
        await axios.post("http://localhost:2000/api/Room/addroom", roomData);
      }
      fetchRooms();
      handleClose();
    } catch (error) {
      console.error("Error adding/updating room:", error);
    }
  };

  const handleOpen = (room = null) => {
    setEditMode(!!room);
    setSelectedRoomId(room ? room._id : null);
    setRoomData(
      room || {
        roomId: "",
        roomType: "Single",
        pricePerNight: "",
        availabilityStatus: "Available",
        housekeepingStatus: "Cleaned",
        image: "",
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setRoomData({
      roomId: "",
      roomType: "Single",
      pricePerNight: "",
      availabilityStatus: "Available",
      housekeepingStatus: "Cleaned",
      image: "",
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Room Management</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Room</Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "navy" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Room ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Housekeeping</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room._id}>
                <TableCell>{room.roomId}</TableCell>
                <TableCell><img src={room.image} height={100} width={100} alt="room" /></TableCell>
                <TableCell>{room.roomType}</TableCell>
                <TableCell>${room.pricePerNight}</TableCell>
                <TableCell>{room.housekeepingStatus}</TableCell>
                <TableCell>{room.availabilityStatus}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => handleDelete(room._id)}>Delete</Button>
                  <Button variant="contained" sx={{ mx: 1, mt: 1 }} color="warning" startIcon={<Edit />} onClick={() => handleOpen(room)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
  <Box sx={{ width: 400, backgroundColor: "white", p: 3, mx: "auto", mt: 10, borderRadius: 2 }}>
    <Typography variant="h6" gutterBottom>
      {editMode ? "Edit Room" : "Add Room"}
    </Typography>

    <TextField
      label="Room ID"
      fullWidth
      margin="normal"
      value={roomData.roomId}
      onChange={(e) => setRoomData({ ...roomData, roomId: e.target.value })}
      disabled={editMode} // Prevent editing roomId when updating
    />

    <TextField
      label="Price per Night"
      fullWidth
      margin="normal"
      type="number"
      value={roomData.pricePerNight}
      onChange={(e) => setRoomData({ ...roomData, pricePerNight: e.target.value })}
    />

    {!editMode && ( // Show image field only when adding a new room
      <TextField
        label="Image URL"
        fullWidth
        margin="normal"
        value={roomData.image}
        onChange={(e) => setRoomData({ ...roomData, image: e.target.value })}
      />
    )}

    {/* Room Type Dropdown */}
    <TextField
      select
      label="Room Type"
      fullWidth
      margin="normal"
      SelectProps={{ native: true }}
      value={roomData.roomType}
      onChange={(e) => setRoomData({ ...roomData, roomType: e.target.value })}
    >
      {["Single", "Double", "Suite", "Deluxe"].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </TextField>

    {/* Availability Status Dropdown */}
    <TextField
      select
      label="Availability Status"
      fullWidth
      margin="normal"
      SelectProps={{ native: true }}
      value={roomData.availabilityStatus}
      onChange={(e) => setRoomData({ ...roomData, availabilityStatus: e.target.value })}
    >
      {["Available", "Booked", "Under Maintenance", "Cleaning"].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </TextField>

    {/* Housekeeping Status Dropdown */}
    <TextField
      select
      label="Housekeeping Status"
      fullWidth
      margin="normal"
      SelectProps={{ native: true }}
      value={roomData.housekeepingStatus}
      onChange={(e) => setRoomData({ ...roomData, housekeepingStatus: e.target.value })}
    >
      {["Cleaned", "Pending"].map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </TextField>

    <Box sx={{ textAlign: "right", mt: 2 }}>
      <Button variant="contained" color="primary" onClick={handleAddOrUpdateRoom}>
        {editMode ? "Update" : "Save"}
      </Button>
    </Box>
  </Box>
</Modal>

    </Container>
  );
};

export default RoomManagement;
